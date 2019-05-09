Introduction to Algorithms 3rd Edition Solutions/Work



## Chapter 2

#### 2.3-7

Given a set S of n integers and another integer x, we may determine whether or not there exists two elements in S such that their sum is equal to x in $\Theta(n\log(n))$ time by

1. Sort S in ascending order with merge-sort. 
2. Then then using two pointers $i,j$ while $i < j$, check if $S[i]+S[j]=x$ , if sum is larger, then decrease $j$ by 1, if sum is smaller, increase $i$ by 1

### (While) Loop Invariant: ?

### 2-1

#### 2-1.a

$n/k$ sublists of length $k$ can be sorted with insertion sort in $\Theta(nk)$ as each sublist of length $k$ can be sorted in $\Theta(k^2)$ worst-case time, and there are $n/k$ sublists, leading to a total worst-case time of $\Theta((n/k )k^2) =\Theta(nk)$

#### 2-1.b

With $n/k$ sorted sublists of length $k$, a total of $T$ merges need to be performed. Each merge of all $n/k$ sublists of length $k$ takes $\Theta(n)$ time. This leaves $n/(2k)$ sublists left to merge, which then leaves $n/(4k)$… sublists left to merge until we have none to merge left. The number of times we must merge an entire level of sublists of length $k,2k,4k,…$ is $\log(n/k)$ (remember that we merge $\log(n)$ times for an array of length $n$)

Thus, the time complexity to merge is $\Theta(n\log(n/k))$

#### 2-1.c

Modified merge-sort using insertion sort at lower levels has worst-case time $\Theta(nk+n\log(n/k))$

$n\log(n) = nk+n\log(n) - n\log(k)$

#### 2-1.d

How should $k$ be chosen in practice? $k$ should be chosen such that performing insertion-sort on an array of $k$ elements is more efficient than performing merge-sort on the same array. This may depend on various factors such as the time it takes to swap elements, the distribution of elements in the array?

### 2-2 Correctness of Bubblesort

Bubblesort:

```pseudocode
for i = 1 to A.length - 1
	for j = A.length downto i + 1
		if A[j] < A[j-1]
			exchange A[j] with A[j-1]
```

#### 2-2.b

Loop invariant for the for loop in lines 2-4 is that $A[j]$ is the smallest element in the subarray $A[j…A.length]$ (Formally: $A[j] \leq A[k]$ for $j<k\leq A.length$)

**Initiation:**

$j=A.length$ prior to the first iteration, and the subarray $A[j…A.length]$ only contains $A[j]$, so invariant must be true.

**Maintenance:**

Prior to an iteration, if the invariant is true, we have that $A[j] \leq A[k]$ for $j<k\leq A.length$ 

After decrementing $j$ to $j-1$, if $A[j-1]$ is greater than $A[j]$, the invariant is preserved by exchanging $A[j-1]$ with $A[j]$ in line 4, making $A[j-1]\leq A[k]$ for $j-1<k\leq A.length$.

**Termination:**

The loop goes from $j=A.length$ to $j=i+1$, so at the end of the for loop we have that $A[i]$ is the smallest element in the sub array $A[i+1…A.length]$ .

#### 2-2.c

Loop Invariant for the for loop in lines 1-4: $A[1…i - 1]$ is an sorted subarray of the smallest $ i-1$ elements of $A$ (ascending order)

**Initiation:**

$i=1$ prior to the first iteration, so $A[1…i-1]$ is an empty subarray and sorted by default.

**Maintenance:**

By the for loop in lines 2-4, the element $A[i]$ becomes the smallest element out of the subarray $A[i…A.length]$. $A[1…i-1]$ is already a sorted subarray of the smallest $i-1$ elements of $A$, so the next smallest element is the smallest element in the subarray $A[i…A.length]$, being $A[i]$, which is larger than all previous elements. By increment $i$, the invariant is preserved as $A[1…i]$ is an sorted subarray of the smallest $i$ elements of $A$

**Termination:**

$i=A.length-1$  at the end, by the invariant, we have that $A[1…A.length-1]$ is a sorted subarray of the smallest $A.length-1$ elements of $A$. By default, $A[A.length]$ must be the largest element, so we end with a sorted array $A$

#### 2-2.d

The worst case running time of bubblesort is $\Theta(n^2)$ as 

```pseudocode
for i = 1 to A.length - 1
	for j = A.length downto i + 1
		if A[j] < A[j-1]
			exchange A[j] with A[j-1]
```

Let $n = A.length$ 

line 1: n 

line 2: $\sum^{n-1}_{i=1}(n-i+1)$

line 3: $\sum^{n-1}_{i=1}(n-i)$

line 4: $\sum^{n-1}_{i=1}(t_i)$ where $t_i=$ number of times $A[j]<A[j-1]$ for that $i$

In the worst case, $t_i = n-i$, meaning each time we check the if statement line 3, it evaluates true and we perform a swap

The total run time is evaluated as follows where $c_i=$ the time it takes to run line $i$ 

$T(n) = c_1n+c_2\sum^{n-1}_{i=1}(n-i+1)+c_3\sum^{n-1}_{i=1}(n-i)+c_4\sum^{n-1}_{i=1}(t_i)$

Looking for the worst case scenario and applying some identities we have:

$T(n) = c_1n + c_2(\frac{(n-1)(n)}{2}+n-1) + c_3(\frac{(n-1)(n)}{2}) + c_4(\frac{(n-1)(n)}{2})$

$T(n) = (c_1+c_2)n + (c_2 + c_3 + c_4)(\frac{n^2-n}{2}) - c_2$

Clearly, $T(n)=an^2+bn+c$ for some $a,b,c$ determined by the $c_i$'s

Leading to a time complexity in the worst case of $\Theta(n^2)$

Generally, insertion sort should be faster as bubblesort makes much more swaps? or more comparisons

### 2-3 Correctness of Horner's Rule

Horner's Rule, evaluating 

$P(x) = \sum^n_{k=0}a_kx^k$

```pseudocode
y = 0
for i = n downto 0
	y = a_i + x * y
```

#### 2-3.a

$T(n) = n+1$. So $\Theta(n)$ is the running time 

#### 2-3.b

A naive implementation would evaluate each term separately, requiring two for loops, one to loop through each term, another to perform the multiplication needed, taking $\Theta(n^2)$ time.

#### 2-3.c

Considering the loop invariant: $y=\sum^{n-(i+1)}_{k=0}(a_{k+i+1}x^k)$

**Initiation:**

$y = 0$; $\sum^{n-(n+1)}_{k=0}(a_{k+i+1}x^k) = 0$, thus loop invariant is true prior to the for loop

**Maintenance:**

Assuming that $y=\sum^{n-(i+1)}_{k=0}(a_{k+i+1}x^k)$ for that $i$

After an iteration, $y=a_{i-1} + x\sum^{n-(i+1)}_{k=0}(a_{k+i+1}x^k)=\sum^{n-i}_{k=0}(a_{k+i}x^k)$, preserving the loop variant for the next iteration $i-1$

**Termination:**

$i=0$, meaning that at this point $y=\sum^{n-1}_{k=0}(a_{k+1}x^k)$

Running through the for loop one final time, we have $y=\sum^{n}_{k=0}(a_{k}x^k)$

#### 2-3.d

Look at termination step of 2-3.c

### 2-4 Inversions

Let $A[1…n]$ be an array of n distinct numbers. If $i < j$ and $A[i] >A[j]$ then $(i,j)$ is an inversion.

#### 2-4.a

$A = [2,3,8,6,1]$

(1,5), (2,5), (3,4), (3,5), (4,5) are the 5 inversions of A

#### 2-4.b

$A=[n,n-1,…,2,1]$ has the most inversions with $n-1 + n-2 + … + 2 + 1=\frac{n^2-n}{2}$

#### 2-4.d

Some math:

Consider the general step of a merge in merge-sorting the original array $A=[a_1,…,a_n]$

We have the left array and right array, a total of $2m$ elements to be merged together into one array. $m$ is the size of both arrays.

$L=[a_{t},a_{t+1}, …, a_{t+m-1}]$, $R=[a_{t+m},a_{t+m+1}, …, a_{t+2m-1}]$

Due to merge-sorting, we have that $L$ and $R$ are sorted, say ascending order.

If $A[j] < A[i]$ for $t+m\leq j \leq t+2m-1$ and $t \leq i \leq t+m-1$

We have an inversion as $i < j$ as well. This occurs during the standard merge when an element from $R$ replaces an element in $A$ as we merge $L$ and $R$ into $A$ as this would mean $A[j] < A[i]$ for the current $i$ representing the current element in $L$ that will be placed down next from $L$. This further implies that $A[j] < A[i+k]$ for $i+k \leq t+m-1$ as $L$ is sorted in ascending order. 

Thus, we have that each time an element from $R$ is replaced into $A$, we find the inversion pairs $(i,j),(i+1,j),…,(t+m-1,j)$ a total of $t+m- i$ of them

So a modified merge-sort algorithm will find the inversions by adding $t+m-i$ to the inversion count each time an element from $R$ is replaced into $A$. Or, add $m-p +1$ where $p$ is the current position in the $L$ array. 

## Chapter 3: Growth of Functions

#### 3.1-1

Clearly, $f(n) + g(n) \leq max(f(n),g(n)) + max(f(n),g(n)) \implies 0.5(f(n)+g(n) \leq max(f(n),g(n))$

Additionally, $max(f(n),g(n)) \leq max(f(n),g(n)) + min(f(n),g(n)) = f(n)+g(n)$

So $max(f(n),g(n)) = \Theta(f(n),g(n))$

#### 3.1-8

$O(g(n,m)) = \{f(n,m):\exists c,n_0,m_0 > 0 \text{ such that } 0 \leq f(n,m) \leq cg(n,m) \text{ for all } n\geq n_0 \text{ or } m\geq m_0 \}$.

$\Theta(g(n,m)) = \{f(n,m):\exists c_1,c_2,n_0,m_0 > 0 \text{ such that } 0\leq c_1g(n,m) \leq f(n,m) \leq c_2g(n,m) \text{ for all } n\geq n_0 \text{ or } m\geq m_0 \}$.

$\Omega(g(n,m)) = \{f(n,m):\exists c,n_0,m_0 > 0 \text{ such that } 0 \leq cg(n,m) \leq f(n,m)  \text{ for all } n\geq n_0 \text{ or } m\geq m_0 \}$.

#### 3.2-4

Is $\lceil{\lg(n)}\rceil$ polynomially bounded? (Does it $=O(n^k)$)

Note that if $f$ is polynomially bounded, we have $0≤f(n) ≤ cn^k \implies \lg(f(n)) ≤ c'\lg(n)$ where $c,k,c'=ck$ are constants, which means that $lg(f(n))=O(\lg(n))$ 

We have that $\lg(n!)=\Theta(n\lg(n))$ (use Stirling's approximation)

We also have that $\lg(n) ≤ \lceil{\lg(n)}\rceil ≤ \lg(n)+1 ≤ 2 \lg(n)$ so $\lceil{\lg(n)}\rceil = \Theta(lg(n))$

Thus, $\lg(\lceil{\lg(n)}\rceil!) = \Theta(\lceil{\lg(n)}\rceil \lg(\lceil{\lg(n)}\rceil))=\Theta(\lg(n)\lg\lg(n))=\omega(\lg(n)) \not = O(\lg(n))$

So $\lceil{\lg(n)}\rceil$ is not polynomially bounded

### 3-1 Asymptotic Behavior of Polynomials

$$p(n) = \sum_{i = 0}^d a_i n^i,$$ where $d \geq 0, a_i$ are constants and $a_d >0$

#### 3-1.a

Consider $p(n)/n^{d} = \sum_{i = 0}^d a_i n^{i-d}$

$p(n) \leq cn^k \implies \sum_{i = 0}^d a_i n^{i-d} \leq c$ 

$c = a_d + b \geq  \sum_{i = 0}^{d-1} a_i n^{i-d}$

Setting $b=1$, $n_0 = max(da_{d-1}, da_{d-2}^{1/2},…,da_{0}^{1/d})$

We then establish that $p(n) \leq cn^k$ for $n \geq n_0 $ thus implying that $p(n) = O(n^d)$

Using the above, a,b,c,d,e are self explanatory. (Set b=-1 for Omega)

#### 3-1.b

#### 3-1.c

#### 3-1.d

#### 3-1.e

### 3-2 Relative Asymptotic Growths

Is $A$ $O,o,\Omega,\omega,\Theta$ of $B$? Assume $k ≥ 1, \epsilon > 0, c > 1$ are constants.


|  A   |  B   | $O$ | $o$  | $\Omega$ |   $\omega$   |  $\Theta$    |
| :--: | :--: | :--: | :--: | :------: | :--: | :--: |
| $\lg^k(n)$ | $n^\epsilon$ | Yes | Yes | No | No | No |
| $n^k$ | $c^n$ | Yes | Yes | No | No | No |
| $\sqrt{n}$ | $n^{\sin{n}}$ | No | No | No | No | No |
|   $2^n$   |  $2^{n/2}$    | No | No | Yes | Yes | No |
|   $n^{\lg{c}}$   |  $c^{\lg{n}}$    | Yes | No | Yes | No | Yes |
|  $\lg{n!}$ | $\lg{n^{n}}$ | Yes | No | Yes | No | Yes |

### 3-3 Ordering by asymptotic growth rates (INCOMPLETE)

$2^{2^{n+1}}$

$2^{2^n}$

$(n+1)!$

$n!$

$n2^n$

$e^n$

$2^n$

$\frac{3}{2}^n$

$\lg{n}^{\lg{n}}$





$2^{\sqrt{2\lg{n}}}$

$2^{\lg^*{n}}$



$n^3$

$n^2$, $4^{\lg(n)}$

$\lg(n!)$, $n\lg(n)$

$n$, $2^{\lg(n)}$



$\ln(n)$

$\ln(\ln(n))$

$\lg^*{n}$

$\lg^*{(\lg{n})}$



### 3-4 Asymptotic Notation Properties

$f(n),g(n)$ be asymptotically positive functions. Prove or disprove the following

#### 3-4.a 

$f(n) = O(g(n))$ does not imply $g(n) = O(g(n))$, consider $f(n) = n$ $g(n) = n^2$

#### 3-4.b

$f(n) + g(n)$ does not equal $\Theta(\min(f(n),g(n)))$, consider $n + n^5$

#### 3-4.c

$f(n) =O(g(n))$ implies $\lg{f(n)} = O(\lg{g(n)})$, where $f(n), g(n) \geq 1$ for sufficiently large $n \geq n_0$

$1 \leq f(n) \leq cg(n) \implies $ $\lg{f(n)} \leq \lg{c} + \lg{g(n)}\leq c_2\lg{g(n)}$

Where we choose $c_2 \geq \frac{\lg{c}}{\lg{g(n_0)}} + 1$ provided $g(n)$ is monotonically increasing, otherwise we can use a coarser bound on $c_2 \geq \lg{c} + 1$

#### 3-4.d

$f(n) = O(g(n))$ doesn't implies $2^{f(n)} = O(2^{g(n)})$

$f$ is O of $g$, so $2^{f(n)} \leq 2^{cg(n)} = 2^{c^{g(n)}}$; Consider $f(n) = 2n$

#### 3-4.e

$f(n)=O((f(n)^2))$ is not always true, consider $f(n) = 1/n$, clearly $1/n \nleq 1/n^2$

When $f(n) \geq 1$ , it is true trivially, otherwise it is not.

#### 3-4.f

$f(n) = O(g(n))$ implies $g(n) = \Omega(f(n))$.

$f(n) \leq cg(n) \implies \frac{1}{c} f(n) \leq g(n)$

#### 3-4.g

$f(n) = \Theta(f(n / 2))$, not true, consider $f(n) = 2^n$

$2^n \leq c2^{n/2}$ would imply $2^{n/2} \leq $c, which is impossible as $c$ is constant.

#### 3-4.h

$f(n) + o(f(n)) = \Theta(f(n))$

$o(f(n))$ contains the functions $0 ≤ g(n) < cf(n)$ for every $c$ and $n \geq n_0$

$f(n) + o(f(n)) \geq \Omega(f(n))$ as $f(n)$ is asymptotically positive, and thus $g(n)$ is too.

Note that $\max(f(n) + o(f(n))) = (c+1)f(n) = O(f(n))$

Thus, $f(n) + o(f(n)) = \Theta(f(n))$



### 3-5 Variations on $\Omega$ and $O$



$\Omega ^ {\infty}$ (read "omega infinity") for this alternative definition. We say that $f(n) = {\Omega}^{\infty}(g(n))$ if there exists
a positive constant $c$ such that $f(n) \ge cg(n) \ge 0$ for infinitely
many integers $n$.

#### 3-5.a INCOMPLETE

Given $f(n), g(n)$ are asymptotically non-negative

Show that either $f(n) = O(g(n))$ or $f(n) = {\Omega}^{\infty}(g(n))$ or both, 
whereas this is not true if we use $\Omega$ in place of 
${\Omega}^{\infty}$.

Is it possible for both? $f(n) = O(g(n)), \Omega^{\infty}(g(n))$, $c_1g(n) \leq f(n) \leq c_2g(n)$. Consider $f(n) = n, g(n) = n$

If $f \not= O(g(n))$

Then $f(n) \geq cg(n)$ for a constant $c$ and for all $n \geq n_0$

#### 3-5.b

$\Omega^\infty$ is a much more strict bound than $\Omega$, given that input sizes are integral, allowing us to set stronger conclusions. If input sizes can be non-integers, then this may be a looser bound and this bound is less informative as no conclusions can be made.

It also allows us to make a conclusion that given $f$ is not $O(g(n))$, it must then be omega infinity of it.

#### 3-5.c

Nothing happens

#### 3-5.d

$$
\begin{aligned}
\tilde{O}(g(n)) =
\{f(n): & \text{ there exist positive constants $c$, $k$, and $n_0$ such that } \\
& \text{ $0 \le f(n) \le cg(n) \lg^k(n)$ for all $n \ge n_0$ }.\}
\end{aligned}
$$

$$
\begin{aligned}
\tilde\Omega(g(n)) = \{f(n):
& \text{ there exist positive constants $c$, $k$, and $n_0$ such that } \\
& \text{ $0 \le cg(n)\lg^k(n) \le f(n)$ for all $n \ge n_0$}.\}
\end{aligned}
$$

$$
\begin{aligned}
\tilde{\Theta}(g(n)) =
\{f(n): & \text{ there exist positive constants $c_1,c_2$, $k_1,k_2$, and $n_0$ such that } \\
& \text{ $0 \le c_1g(n)lg^{k_1}(n) \le f(n) \le c_2g(n) \lg^{k_2}(n)$ for all $n \ge n_0$ }.\}
\end{aligned}
$$



If $f$ is $\tilde\Omega$ and $\tilde O$ of $g$ for $n \ge n_1$ and $n \ge n_2$ respectively, then choose $n_0 = \max (n_1,n_2)$ for $\tilde\Theta$

and maintain all other constants the same.

### 3-6 Iterated Functions *

$$
\begin{array}{ccl}
f(n)      & c & {f_c}^*                    \\
\hline
n - 1     & 0 &  \Theta(n) \\
\lg n     & 1 &  \Theta(\lg^*{n}) \\
n / 2     & 1 & \Theta(\lg{n})\\
n / 2     & 2 & \Theta(\lg{n})\\
\sqrt n   & 2 &  \Theta(\lg{\lg{n}})\\
\sqrt n   & 1 &   \text{Not Possible}\\
n^{1 / 3} & 2 & \Theta(\log_3{\lg{n}}) \\
n / \lg n & 2 & \Theta(\frac{\lg{n}}{\lg\lg{n}}) \text{ I dont know why though}
\end{array}
$$

Interesting:

$f(n) = n^{1/k}$ for $k \ge 2$ 

$f_c^*(n) = \Theta(\log_k{\log_c{n}})$

#### 

## Chapter 4: Divide and Conquer

#### 4.1-2

A $\Theta(n^2)$ algorithm for finding the maximum subarray (brute force)

```pseudocode
n = A.length
if n == 0
	return null
b = 1
c = 1
currentMax = A[1]
for i = 1 to n
	//i is the leftmost element index of the subarray to be checked
	for j = i to n
		//j  is the rightmost element index of the subarray to be checked
		
```



#### 4.1-5

A $O(n)$ algorithm for finding the maximum subarray.

Some math first:

This uses the observation that the maximum subarray of $A[1…j+1]$ is either the maximum subarray of $A[1…j] = A[b…c]$ or a subarray $A[i…j+1]$ for $1 \le i \le j+1, 1 \le b,c \le j$. This observation is true as this encapsulates all possible subarrays, and thus one of which must be the maximum subarray.

We make the next observation that when incrementing $j$, the maximum subarray of $A[1…j+1]$ will always be the maximum subarray of $A[1…j] = A[b…c]$ unless the sum of the elements in $A[c+1…j+1]$ is positive. Let $S(A[t_1…t_2])$ denote the sum $A[t_1]+A[t_1+1]+…+A[t_2]$

When incrementing $j$, the new max subarray leftmost element index will always be at least $b$. Assume for the sake of contradiction the leftmost element index is not $b$. Then there's a subarray $A[b_2…b-1]$ whose sum is positive and would increase the maximum array sum. But then the maximum subarray of $A[1…j]$ wouldn't be $A[b…c]$ as $A[b_2…b-1,b…c]$ has a larger sum, a contradiction. That said, the leftmost element index may increase.

Additionally, if the new max subarray leftmost element index is $b_3 \not= b$, then it must be $> c$

If $b < b_3 \le c$ then $S(A[b_3…c]) < S(A[b…c])$, and so if the new max subarray includes an element between $b$ and $c$ indices, then the leftmost element index must be $b$ as this will maximize the sum. Otherwise if the new max subarray doesn't include an element between $b$ and $c$ indices, then the leftmost element index $> c$

Knowing the above, we now have that the maximum subarray of $A[1…j+1]$ is either $A[b…c]$, or $A[b…j+1]$ or $A[i…j+1]$ where $i > c$.

It will now be shown that the maximum subarray of the form $A[i…j+1]$ must either be $A[j+1]$ or the max subarray of $A[c+1….j]$ with $A[j+1]$ added to it.

Suppose the maximum subarray of $A[c+1…j]$ is $A[d…j]$ where $c+1 \le d$. The leftmost element index of the maximum subarray of $A[c+1…j+1]$ must be $d$ or $j+1$. If the index $d_1 < d$, then the maximum subarray of $A[c+1…j]$ would not be $A[d…j]$, it would be $A[d_1…j]$ as $S(A[d_1…d-1]) > 0$. If the leftmost element index was $d_2 > d, d_2 \not= j+1$, the maximum subarray of $A[c+1….j]$ would be $A[d_2…j]$ as $S(A[d…d_2-1]) <0$. Thus, we reduce the possible maximum subarrays of the form $A[i…j+1]$ to only two possibilities, $A[j+1]$, or the max subarray of $A[c+1…j]$ that contains $A[j]$ and has the element $A[j+1]$ appended to it.

To conclude, at the $jth$ iteration, the next maximum subarray given that the maximum subarray of $A[1…j] = A[b…c]$ must be one of $A[j+1]$, $A[b…c]$, or the max subarray of $A[c+1…j] = A[k…j]$ that contains $A[j]$ and has the element $A[j+1]$ appended to it. This is reflected in the pseudocode below, where we first determine which of either $S(A[k…j]) + A[j+1]$ or $A[j+1]$ is larger (rightsum < 0) and then determine if it is larger than the current maximum sum of the current maximum subarray at the $jth$ iteration.

```pseudocode
FIND-MAXIMUM-SUBARRAY(A)
n = A.length
if n == 0
	return null
rightsum = A[1]
b = 1 //b = leftmost index of maximum subarray of A[1...j]
c = 1 //c = rightmost index of maximum subarray of A[1...j]
t1 = 0 //t1 = leftmost index of maximum subarray of A[c+1...j] that has element A[j]
currentMax = A[1]
for j = 2 to n
	if rightsum < 0
		rightsum = A[j]
		t1 = j
	else
		rightsum = rightsum + A[j]
	if currentMax > rightsum
		b = t1
		c = j
		currentMax = rightsum
return (b, c, currentMax)	
```

#### 4.2-2

Pseudocode for Strassen's Algorithm

Note that $A[i][j]$ refers to the value $A_{ij}$ in the matrix $A$.

Variables $Aij$ such as $A11$ are created from partitioning $A,B,C$.

```pseudocode
MultiplySquareMatrix(A,B)
n = A.length
let C be a new n x n matrix
if n == 1
	C[1][1] = A[1][1] * B[1][1] //we are one-indexed
else partition A, B, C into 4 sub-matrices each //Step 1
	Compute the S matrices S1, S2, ..., S10 //These are simple additions, step 2
	//Step 3
	P1 = MultiplySquareMatrix(A11, S1)
	P2 = MultiplySquareMatrix(S2, B22)
	P3 = MultiplySquareMatrix(S3, B11)
	P4 = MultiplySquareMatrix(A22, S4)
	P5 = MultiplySquareMatrix(S5, S6)
	P6 = MultiplySquareMatrix(S7, S8)
	P7 = MultiplySquareMatrix(S9, S10)
	//Step 4
	C11 = P5 + P4 - P2 + P6
	C12 = P1 + P2
	C21 = P3 + P4
	C22 = P5 + P1 - P3 - P7
	Combine C11,C12,C21,C22 into one matrix C accordingly
return C
	
```

It should be noted that at line 4, it is much better to set when $n \le N$, where $N$ could be 1024, we should then compute $C$ with a the classic $\Theta(n^3)$ non-recursive algorithm as this would involve less function calls and a lot less operations of just adding and subtracting.

#### 4.2-3

How can Strassen's algorithm be modified to multiply square matrices in which its size is not an exact power of 2? Does it run in $\Theta(n^{\lg{7}})$?

We can increase the size of the square matrices by padding the additional rows and columns of 0's. This is essentially done by copying into a new array of size $n_2 \times n_2$ where $n_2 \ge n$ and $n_2$ is a power of 2. In fact, $n_2 = 2^{\lceil\lg{n}\rceil}.$ Creating a new array of size $n_2 \times n_2$ and copying values into it clearly takes $\Theta(n_2^2) =\Theta(n^2)$ because $\Theta(\lceil \lg{n} \rceil) = \Theta(\lg{n})$. $n^2 = o(n^{\lg{7}})$, so Strassen's still runs in $\Theta(n^{\lg{7}})$

#### 4.2-4 INCOMPLETE

What is the largest $k$ such that if you can multiply $3 \times 3$ 
matrices using $k$ multiplications (not assuming commutativity of 
multiplication), then you can multiply $n \times n$ matrices is time
$o(n^{\lg 7})$? What would the running time of this algorithm be?

We would divide a matrices into 9 square sub-matrices of size $n/3$

Then $T(n) = k T(n/3) + \Theta(n^2)$

#### 4.2-5 INCOMPLETE

#### 4.2-6 ?

Multiply a $kn\times n$ matrix by an $n\times kn$ matrix using Strassen's as an subroutine would result in padding the input matrices into $kn \times kn$ matrices, then the algorithm run time would be $\Theta((kn)^{\lg{7}})$

We can also split the inputs into $k$ $n \times n$ matrices and perform Strassen's $k$ times and combine the results.

For multiplying a $n \times kn$ matrix by an $kn \times n$ matrix, (output matrix has rows A x columns B), we output a $n \times n$ matrix. 

#### 4.2-7

$(a+bi) \cdot (c+di) = ac-bd+(ad+bc)i$

Can the above calculation be done in 3 multiplications of real numbers?

Compute $a+b, \ c+d$ and compute $A = (a+b)(c+d)=ac+ad+bc+bd$, one multiplication

Compute $(a)(c) = ac, \ (b)(d) = bd$, two multiplications

Note that $A-ac-bd = ad + bc$, giving us the imaginary component

Computing $ac-bd$ then gives us the real component

$\square$

#### 4.3-1

We guess that $T(n) \le cn^2$
$$
\begin{eqnarray}
T(n) & = & T(n-1) +n \\
& \le & c(n-1)^2 + n\\
& = & cn^2-2cn+c+n\\
& = & cn^2 - n(2c-1) + c \\
& \le & cn^2
\end{eqnarray}
$$
With the last line true provided that $c \ge 1$

#### 4.3-7

Consider $T(n) = 4T(n/3) + n = \Theta(n^{\log_3{4}})$, known by the master theorem

If we guess that $T(n) \le cn^{\log_3{4}}$
$$
\begin{eqnarray}
T(n) & = & 4T(n/3) + n \\
& \le & 4(c(n/3)^{\log_3{4}})+n \\
& = & 4c(\frac{n^{\log_3{4}}}{4}) + n \\
& = & cn^{\log_3{4}} + n \\
& \not\le & cn^{\log_3{4}}

\end{eqnarray}
$$
So, this doesn't show anything.

Suppose we guess that $T(n) \le cn^{\log_3{4}}-dn$
$$
\begin{eqnarray}
T(n) & = & 4T(n/3) + n \\
& \le & 4(c(n/3)^{\log_3{4}}-d(n/3))+n \\
& = & 4(c\frac{n^{\log_3{4}}}{4}-dn/3) + n \\
& = & cn^{\log_3{4}} -4dn/3+ n \\
& \le & cn^{\log_3{4}} - dn
\end{eqnarray}
$$
Which is true provided that $d \ge 3$

If $T(1) = 1$, then $c \ge 4$ as $4\cdot 1^{\log_3{4}} - 3 \cdot 1 = 1$

Thus, we can choose $n_0 = 1, c = 4$

#### 4.3-8

Consider $T(n) = 4T(n/2) + n^2 = \Theta(n^2\lg(n))$, known by the master theorem. (Book might be wrong, it says it's n^2 but I can't seem to show that works. Substituting n^2lg(n) works though).

Guessing that $T(n) \le cn^2\lg{n}$
$$
\begin{eqnarray}
T(n) & = & 4T(n/2) + n^2 \\
& \le & 4(c(n/2)^2\lg{(n/2)})+n^2 \\
& = & cn^2\lg{n} -cn^2 + n^2 \\
& \le & cn^2\lg{n}
\end{eqnarray}
$$
Last line is true provided $c \ge 1 $

Guessing that $cn^2\lg{n} \le T(n)$
$$
\begin{eqnarray}
T(n) & = & 4T(n/2) + n^2 \\
& \ge & 4(c(n/2)^2\lg{(n/2)})+n^2 \\
& = & cn^2\lg{n} -cn^2 + n^2 \\
& \ge & cn^2\lg{n}
\end{eqnarray}
$$
Provided $c \le 1$

Let $c_1=1,\ c_2=2$, we proceed to prove the boundary cases.

Set $T(1) = 1$. 

$T(2) = 4(T(1)) + 2^2 = 8$

Then $n^2\lg{n} \le 8\le 2n^2\lg{n}$

So $n_0=2$, which works as $4 \le 8\le 8 $

So indeed, $T(n) = \Theta(n^2\lg{n})$

#### 4.3-9

$T(n) = 3T(\sqrt{n})+\lg{n}$

Let $m = \lg{n}$, and $S(m) = T(2^m)$

We have $T(2^m) = 3T(2^{m/2}) + m \implies S(m) = 3S(m/2) + m$

Guess that $S(m) = \Theta(m^{\lg{3}})$

Test stronger bounds e.g $c_1m^{\lg{3}} + d_1m \le S(m) \le c_2m^{\lg{3}} - d_2m$
$$
\begin{eqnarray}
S(m) & = & 3S(m/2) + m \\
& \le & 3(c_2(m/2)^{\lg{3}}-d_2(m/2) + m \\
& = & c_2m^{\lg{3}}-3d_2(m/2) + m \\
& \le & c_2m^{\lg{3}} -d_2m
\end{eqnarray}
$$
Which is true provided, $d_2 \ge 2$
$$
\begin{eqnarray}
S(m) & = & 3S(m/2) + m \\
& \ge & 3(c_1(m/2)^{\lg{3}}+d_1(m/2) + m \\
& = & c_1m^{\lg{3}}+3d_1(m/2) + m \\
& \ge & c_1m^{\lg{3}} +d_1m
\end{eqnarray}
$$


Which is true provided $d_1 \ge 2$

Testing for boundary conditions, set $S(1) = 1$ (which implies $T(1) = 1$)

Set $d_1,d_2 = 2$, we have that $c_2 \ge 3, c_1 \le1/3 $, $n_0 = 1$

So $S(m) = \Theta(m^{\lg{3}})$

Implying $T(2^m) = 3T(2^{m/2}) + m = \Theta(m^{\lg{3}})$

Implying $T(n) = 3T(\sqrt{n}) + \lg{n} = \Theta(\lg{n}^{\lg{3}})$



#### 4.4-3

Let $T(n) = 4T(n/2 + 2) + n$

At depth $i$, there are $4^i$ nodes, all the same size of $((...((n/2)+2)/2+2)…+2)/2 + 2)$, with $i$ divisions in the continued fraction. The continued fraction evaluates to 
$$
\frac{n+2^2+2^3+…2^{i-1}}{2^i} = \frac{n+4(2^{i}-1)}{2^i}
$$
So the runtime at depth $i$ is
$$
 4^i\frac{n+4(2^{i}-1)}{2^i} = 2^in+2^{i+2}(2^i-1)
$$
Tree goes all the way until $T(1)$ is reached, so when $\frac{n+4(2^{i}-1)}{2^i} = 1$

As $n$ grows large, the constant term becomes irrelevant anyway, so the depth is about $k = \lg{n}$

The runtime is then also approximately $2^in$ at depth $i$ for large $n$. So we can make the following approximation, with the additional assumption that $n$ is a power of 2 for simplicities sake.
$$
\begin{eqnarray}
T(n) & = & n + 2n + 2^2n +…+ 2^{\lg{n}}n \\
& = & n(n-1) \\
& = & n^2 - n \\
& \le & n^2
\end{eqnarray}
$$
So guess that $T(n) = O(n^2)$
$$
\begin{eqnarray}
T(n) & = & 4T(n/2+2)+n \\
& \le & 4(c(n/2+2)^2) +n \\
& = & cn^2 + 8cn + 16c + n \\
\end{eqnarray}
$$
Oops, induction paradox probably needed

Guess that $T(n) \le cn^2 - dn$
$$
\begin{eqnarray}
T(n) & = & 4T(n/2+2)+n \\
& \le & 4(c(n/2+2)^2-d(n/2+2)) +n \\
& = & cn^2 + 8cn + 16c-4d(n/2+2) + n \\
& \le & cn^2 -dn
\end{eqnarray}
$$
Last line is true provided 
$$
\begin{eqnarray}
cn^2 - dn & \ge & cn^2 + 8cn+16c-4d(n/2+2)+n \\
(2n+8)d -dn & \ge & 8cn+16c+n \\
d & \ge & \frac{8cn+16c+n}{n+8} \\
d & \ge & \frac{8c+16c/n + 1}{1+8/n}
\end{eqnarray}
$$
For large $n$, it would then imply
$$
\begin{eqnarray}
d \ge 8c + 1
\end{eqnarray}
$$
Which is entirely possible, but let's first test boundary conditions anyway.

We notice that for $n \le 8 $, $T(n)$ isn't exactly going to be $\le$ than $cn^2 - (8c+1)n=cn^2$ assuming positive runtimes.

So we need to evaluate some base cases. (We skip over $n=1,2,3,4$ because they don't mean much and can't be evaluated properly)

Let $T(5) = 5$, choose $d = 8c+1$

$T(6) = 4T(3+2) + 6 = 26$

$T(8) = 4T(4+2) + 8 = 112$

$T(12) = 4T(6+2) + 12 = 460$

Now if we let $n_0 = 12$,
$$
\begin{eqnarray}
T(12) & = & 460 \le c\cdot12^2 - (8c+1)\cdot12 \\
460 & \le & 48c-12 \\
472/48 & \le & c
\end{eqnarray}
$$
So we prove that $T(n) = O(n^2)$, for $n \ge n_0 = 12$ and $c \ge 472/48$, bounding $T(n) \le cn^2$, given $T(5) = 5$

Curiously, $T(4) = -4/3$ as implied by $T(4) = 4T(4/2 +2) + 4$

#### 4.4-6

At each level $i$, there are $2^i$ nodes, and $i\choose m$ nodes of size $(2^m/3^i)n$. Remembering that there is also the $O(n)$ factor in $T(n)$, the root size is $n$ and the non recursive portion takes $cn$ time. Thus, we can compute the total running time $T_i(n)$ at level $i$ as
$$
\begin{eqnarray}
T_i(n) & = & c \sum_{m=0}^{2^i} {i \choose m}{\frac{2^mn}{3^i}} \\
& = & cn \sum_{m=0}^{2^i} {i \choose m}{\frac{2^m}{3^i}} \\
& = & cn (\frac{2}{3} + \frac{1}{3})^{2^i} \\
& = & cn
\end{eqnarray}
$$
However, $T_i(n) = cn$ only when $i \le \lceil \log_{3}{n} \rceil$, so if we only measure the runtime up to that level, we would underestimate $T(n)$, so $T(n) = \Omega(n\log_3{n}) = \Omega(n\lg{n})$

#### 4.4-9
Solve the recurrence $T(n) = T(\alpha n) + T((1-\alpha)n) + cn$, for $0<\alpha < 1$ and $c >0$

At each level $i$ until a certain depth, there are $2^i$ nodes, and $i\choose m$ nodes of size $(\alpha^m(1-\alpha)^i)n$. Remembering that there is also the $O(n)$ factor in $T(n)$, the root size is $n$ and the non recursive portion takes $cn$ time. Thus, we can compute the total running time $T_i(n)$ at level $i$ as
$$
\begin{eqnarray}
T_i(n) & = & c \sum_{m=0}^{2^i} {i \choose m}{(\alpha^m(1-\alpha)^i)n} \\
& = & cn \sum_{m=0}^{2^i} {i \choose m}(\alpha^m(1-\alpha)^i) \\
& = & cn (\alpha + 1-\alpha)^{2^i} \\
& = & cn
\end{eqnarray}
$$
Analyzing the recursion tree, we see that it's incomplete, with the shortest path from root to leaf being $1=\alpha^kn$, $k = \log_{1/\alpha_0}(n)$, where $\alpha_0 = \min{(\alpha, 1-\alpha)}$

The longest path from root to leaf is $\log_{1/\alpha_1}(n)$, where $\alpha_1 = \max(\alpha,1-\alpha)$

We see that

 $T_i(n) = cn$ for $i \le \lceil{log_{1/\alpha_0}(n)}\rceil$, and $T_i(n) \le cn$ for $\lceil{log_{1/\alpha_0}(n)}\rceil \le i \le \lceil{log_{1/\alpha_1}(n)}\rceil$

As $T(n) = \sum^{\lceil{log_{1/\alpha_1}(n)}\rceil}_{i=0}T_i(n)$ and all $T_i(n) > 0$.

$cn\lceil{log_{1/\alpha_0}(n)}\rceil\le T(n) \le cn\lceil{log_{1/\alpha_1}(n)}\rceil$

We have, $T(n) = \Omega(cn\lceil{log_{1/\alpha_0}(n)}\rceil) = \Omega(n\log_{1/\alpha_0}(n))=\Omega(n\lg{n})$

$T(n) = O(cn\lceil{log_{1/\alpha_1}(n)}\rceil) = O(n\log_{1/\alpha_1}(n))=O(n\lg{n})$

So $T(n) = \Theta({n\lg{n}})$ (I'm pretty sure this is mathematically rigorous)

We can substitute to verify just in case.

We guess that $T(n) \le dn\lg{n}$
$$
\begin{eqnarray}
T(n) & = & T(\alpha n) + T((1-\alpha)n) + cn \\
& \le & d\alpha n\lg(\alpha n) + d(1-\alpha)n\lg{((1-\alpha)n)} + cn\\
& = & d\alpha n (\lg(\alpha) + \lg(n)) + d (1-\alpha)n(\lg(1-\alpha) + \lg(n)) + cn \\
& = & dn\lg(n) + d\alpha n \lg(\alpha) + d(1-\alpha)n\lg(1-\alpha) + cn
\end{eqnarray}
$$
Knowing that $0 <  \alpha < 1$
$$
\begin{eqnarray}
T(n) & \le & dn\lg(n) + d\alpha n \lg(\alpha) + d(1-\alpha)n\lg(1-\alpha) + cn\\
& \le & dn\lg(n) 
\end{eqnarray}
$$
This is true as both terms with $\lg(\alpha)$ and $\lg(1-\alpha)$ are negative and provided that $d$ is sufficiently large enough to reduce $cn$. To bound $d$, we do the following
$$
\begin{eqnarray}
dn\lg(n) & \ge & dn\lg(n) + d\alpha n \lg(\alpha) + d(1-\alpha) n \lg(1-\alpha) + cn \\
-cn & \ge & dn(\alpha\lg(\alpha) + (1-\alpha)\lg(1-\alpha)) \\
\frac{-c}{\alpha\lg(\alpha) + (1-\alpha)\lg(1-\alpha)} & \le & d
\end{eqnarray}
$$
The sign switch at the end is due to $\alpha\lg(\alpha) + (1-\alpha)\lg(1-\alpha) < 0$ 

To prove the lower bound, we can do the same thing and we will get that 
$$
\begin{eqnarray}
\frac{-c}{\alpha\lg(\alpha) + (1-\alpha)\lg(1-\alpha)} & \ge & d
\end{eqnarray}
$$
Therefore, $T(n) = \Theta(n\lg{n})$

#### 4.5-3

n->n/2->n/4….->1. $\lg{n}$ levels, each taking constant time, so $T(n) = T(n/2) + \Theta(1) = \Theta(\lg{n})$

#### 4.5-4

$T(n) = 4T(n/2) + n^2\lg{n}$

$f(n) = n^2\lg{n}$, $n^{\log_b{a}}=n^2$. However, $n^2\lg{n} \not= \Omega(n^{2+\epsilon})$ 

Formal proof:

Suppose for the sake of contradiction $n^2\lg{n} = \Omega(n^{2+\epsilon})$ for $\epsilon >0$

Then $cn^{2}n^{\epsilon} \le n^2 \lg{n}$ for all $n \ge n_0$ where $c > 0$

This implies $cn^\epsilon \le \lg{n}$, a contradiction as logarithmic functions are polynomially bounded ($= O(n^k)$)

Thus, the master method cannot be used to solve for the recurrence solution.

Analyzing the recursion tree, we see that at level $i$, there are $4^i$ nodes, all of the same size $n/2^i$, each node with a runtime of $\frac{n^2}{2^{2i}}\lg(n/2^i)$. The runtime at level $i$ is then $4^i \cdot \frac{n^2}{2^{2i}}\lg(n/2^i) = n^2(\lg(n/2^i)) = n^2(\lg(n) - i)$

The recursion stops at the base case of size 1, which is the level $i$ when $n/2^i = 1$, which is $i = \lg{n}$

So the total runtime is (Math is correct, final step skips some formalities but works)
$$
\begin{eqnarray}
T(n) & = & \sum_{i=0}^{\lg{n}}n^2(\lg(n)-i) \\
& = & \sum_{i=0}^{\lg{n}}n^2\lg(n)-n^2i \\
& = & (\lg(n)+1)(n^2\lg(n)) - n^2\sum_{i=0}^{\lg{n}}i \\
& = & (\lg(n)+1)(n^2\lg(n)) - (n^2)(\frac{(\lg{n})(\lg{n}+1)}{2}) \\
& = & n^2(\frac{(\lg{n})(\lg{n}+1)}{2}) \\
& = & \frac{1}{2} \cdot n^2\lg^2{n}+n^2\lg{n} \\
& = & \Theta(n^2\lg^2{n})
\end{eqnarray}
$$

#### 4.5-5

Examples of $f(n)$, values of $a,b$ in $T(n) = aT(n/b) + f(n)$ such that $f(n) = \Omega(n^{\log_a{b}-\epsilon})$, but the regularity constraint $af(n/b) \le cf(n)$ is not met. (Note $c<1$)

Consider $n(2-\sin(n))$

#### 4.6-1 INCOMPLETE

$n_j = \lceil{n_{j-1}/b}\rceil$, where $n_0 = n$

An exact expression can be derived

Consider $n = b^m + (n-b^m)$, where $m = \lfloor{\log_b{n}}\rfloor$

Then $n_1 = \lceil{b^{m-1}+\frac{n-b^m}{b}}\rceil = b^{m-1} + \lceil{\frac{n-b^m}{b}}\rceil$ as $b^{m-1}$ is not fractional. Based on this intuition, I claim that
$$
n_j = \lceil{b^{m-j}+\frac{n-b^m}{b^j}}\rceil \\
\text{Where } m=\lfloor{\log_b{n}}\rfloor
$$


Assuming $n_j = \lceil{b^{m-j}+\frac{n-b^m}{b^j}}\rceil$
$$
\begin{eqnarray}
n_{j+1} & = & \lceil{\lceil{(b^{m-j}+\frac{n-b^m}{b^j}}\rceil )/ b}\rceil \\
& = & \lceil{b^{m-j-1}+(\lceil{\frac{n-b^m}{b^j}}\rceil )/ b}\rceil \\
& = & 
\end{eqnarray}
$$


## Chapter 5: Probabilistic Analysis and Randomized Algorithms

#### 5.1-3

#### 5.3-5

Probability that randomly choosing $n$ elements from the set ${1,2,…n^3}$ such that all $n$ are unique is

$(1)(1-1/n^3)(1-2/n^3)…(1-(n-1)/n^3)=n^3(n^3-1)(n^3-2)…(n^3-n+1)/(n^3)^n$

As choosing the first element is arbitrary, the next one you must choose one that isn't the first, so complement of choosing the first is $1-1/n^3$ and so forth...

That probability is more than $(1-n/n^3)^n=(1-1/n^2)^n \geq 1-1/n$

Last step holds due to $(1-x)^n \geq 1-nx$

#### 5.3-7

Let RS(m,n) denote the randomized algorithm that randomly selects a $m$ sized subset of $n$ unique elements.

We will prove by induction that the probability of a particular permutation from RS(m,n) occuring is $m!/n!$

$RS(0,0) = \O$, the empty set all the time. $0!/0! = 1$, so this base case works

Assuming that $RS(m-1,n-1)$ randomly selects a $(m-1)$-subset $S'$ with probability $(m-1)!/(n-1)!$

When we set $i=Random(1,n)$

If $i = $ any of the $m-1$ terms in $S'$ or $i=n$, the returned set $S$ is $RS(m-1,n-1) \cup \{n\}$, with the probability of this union occuring being $m/n$ as there are $m$ possibilities out of $n$ that $i$ could be that would lead to this

The probability of a particular set returned from $RS(m-1,n-1) \cup \{n\}$ is then $(m-1)!/(n-1)! \cdot m/n= m!/n! $

If $i=j$ where $j \notin S'$ , that occurs with probability $1-m/n = (n-m)/n$.

The probability of a particular set returned of the form $RS(m-1,n-1) \cup \{i\}$ is then $(m-1)!/(n-1)! \cdot (n-m)/n= (m-1)!(n-m)/n! $

There are $n-m$ possible values of $i$, each with the same probability of being chosen, so for a particular $i$, the returned set has probability of $(m-1)!(n-m)/n!/(n-m) = m!/n!$

Thus, each $m$-subset is equally likely to appear and we achieve a uniform randomness.

### 5-2

#### 5-2.a

```pseudocode
Random-Search(A,x)
n = A.length
S = Ø
while (|S| != n)
	i = Random(1,n)
	if (x == A[i])
		return i
	else
		S = S union {i}
return NIL
```

#### 5-2.b

It's modelled by Bernoulli trials, where probability of success is $1/n$, therefore the expected number of trials before success is $1/1/n = n$

#### 5-2.c

$1/(k/n) =n/k$

#### 5-2.d

#### 5-2.e

Average-case running time of Deterministic-Linear-Search is 1/n+2/n+…+n/n = $(n+1)/2$

Worse-case running time is also $n$

#### 5-2.f

Worst-case run time is if all desired values are at the end of the array, so $n-k+1$

Average case is a little harder

Not sure why, but Probability of $X_i=$ indicator random variable that the $ith$ element is a match is $1/(k+1)$

Average case run time is $(n+1)/(k+1)$

#### 5-2.h

$k=0$, worst-case run time is $n$, expected run time is still $n$

$k=1$, worst-case run time is $n$, expected run time is $(n+1)/2$

$k\geq1$, worst-case and average run time is $(n+1)/(k+1)$



### 6-2

#### 6-2.a

A $d$-ary heap can be represented by following the order of the elements in the heap from first to final level, left to right on each level, incrementing the index one by one.

Index $i$ has $d$ children at $di-d+2,di-d+3,di-d+4,…,di+1$

#### 6-2.b

$d$-ary heap with $n$ elements with a height $h$ has $n$ such that
$$
d_0+d_1+...+d^{h-1}\lt n \leq d^0+d^1+...+d^{h}\\
(d^h-1)/(d-1) < n \le (d^{h+1}-1)/(d-1) \\
h \lt \log_d{(n(d-1)+1)} \le h+1 \\
\lceil{\log_d{(nd-n+1)}}\rceil = h \\
\Theta(\lg{n}/\lg{d}) = h
$$

#### 6-2.c

Extract-max for a d-ary heap involves returning $A[1]$ and exchanging $A[1]$ (the largest element) with $A[A.heap\_size]$. We then need to run Max-heapify$(A,1)$ for the $d$-ary heap.

The only difference compared to a binary heap is that for Max-heapify(A,i), at index $i$, you need to check which of the $d$ children and $A[i]$ have the largest value and swap those two, then continue.

Max-heapify normally takes $O(h)$ time, not considering the twp steps taken to find the max value of the children and the element. So the modified max-heapify takes $O(d \lg{n}/\lg{d})$

### 6-3

#### 6-3.a

#### 6-3.b

If $Y[1,1]$ is nonexistent, then $Y$ is empty as rows and columns are sorted left to right and top to bottom, and 1,1 if a nonexistement element is at the very left and top of row 1 and column 1, there are no other elements in those rows and columns. Similar recursive argument applies for rest of rows and columns.

If $Y[m,n] < \infty$ (it exists), then there must be a number at $Y[i,n]$ for $i=1…m$, and a number at $Y[m,j]$, for $j=1…n$. Similar recursive argument applies for rest of rows and columns. As a number at $Y[i,n]$ implies theres elements at $Y[i,j]$, for $j=1…n$ etc.

#### 6-3.c

Extract-min returns $Y[1,1]$

```pseudocode
Extract-min(Y)
return Y[1,1]
Heapify(Y[1...m,1...n],[1,1])
```

```pseudocode
Heapify(Y,[i,j])
n = Y.rows
m = Y.columns
smallest = [i,j]
if Y[i,j] > Y[i+1,j]
	smallest = [i+1,j]
if Y[smallest] > Y[i,j+1]
	smallest = [i,j+1]
if (smallest == [i,j])
	
else
	exchange Y[i,j] with Y[smallest]
	Heapify(Y[smallest[0],smallest[1]]) 
```

To heapify, we compare $Y[i,j]$ with its neighbors and find the smallest one, and exchange them. If $Y[i,j]$ is the smallest one, we terminate as we are finished.

Each use of Heapify in the worst case has run time $T(p) = T(p-1) + O(1)$, implying extract-min runs in $T(m+n) = O(m+n)$

#### 6-3.d

Inserting a new element into a mxn young tableau. Insert element at bottom right square, and keep shifting it upwards and leftwards if its smaller than the element above it or to the left of it.

#### 6-3.e

We can build the sorted array $A$ given a $Y$ tableau

```pseudocode
Young-tableau-sort(Y)
A = new array of size n^2
for i = 1 to n^2
	A[i] = Y[1,1]
	Y[1,1] = infinity
	Heapify(Y,[1,1])
```

Heapify is run $n^2$ times, and each heapify takes $O(n+n)=O(n)$ time, so a total of $O(n^3)$

Given an unsorted array of $n^2$ elements in $A$, we can sort it in $O(n^3)$ by first inserting all $n^2$ elements in time $n^2O(n+n)=O(n^3)$ time. We can then run young-tableau-sort, which also runs in $O(n^3)$, (and instead of creating a new array $A$, we can sort in place)

#### 6-3.f

We make the observation that if we start from the lower left corner, moving up or to the right, the strictly decrease or increase the value of the current square

```pseudocode
Search-young-tableau(Y,x)
p = Y.rows + Y.columns
checks = 0
i = 1, j = y.columns //bottom left corner
while (checks != p)
	if Y[i,j] == x
		return true (or [i,j])
	if Y[i,j] < x
		i += 1
	else
		j -= 1
	checks += 1
return NIL
```

