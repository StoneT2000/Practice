# Introduction to Algorithms 3rd Edition Solutions/Work



## Chapter 2

#### 2.3-7

Given a set S of n integers and another integer x, we may determine whether or not there exists two elements in S such that their sum is equal to x in $\Theta(n\log(n))$ time by

1. Sort S in ascending order with merge-sort. 
2. Then then using two pointers $i,j$ while $i < j$, check if $S[i]+S[j]=x$ , if sum is larger, then decrease $j$ by 1, if sum is smaller, increase $i$ by 1

(While) Loop Invariant: ?

### 2-1

#### 2-1.a

$n/k$ sublists of length ​$k$ can be sorted with insertion sort in $\Theta(nk)$ as each sublist of length $k$ can be sorted in $\Theta(k^2)$ worst-case time, and there are $n/k$ sublists, leading to a total worst-case time of $\Theta((n/k )k^2) =\Theta(nk)$

#### 2-1.b

With $n/k$ sorted sublists of length $k$, a total of $T$ merges need to be performed. Each merge of all $n/k$ sublists of length $k$ takes $\Theta(n)$ time. This leaves $n/(2k)$ sublists left to merge, which then leaves $n/(4k)$… sublists left to merge until we have none to merge left. The number of times we must merge an entire level of sublists of length $k,2k,4k,…$ is $\log(n/k)$ (remember that we merge $\log(n)$ times for an array of length $n$)

Thus, the time complexity to merge is $\Theta(n\log(n/k))​$

#### 2-1.c

Modified merge-sort using insertion sort at lower levels has worst-case time $\Theta(nk+n\log(n/k))​$

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

$j=A.length​$ prior to the first iteration, and the subarray $A[j…A.length]​$ only contains $A[j]​$, so invariant must be true.

**Maintenance:**

Prior to an iteration, if the invariant is true, we have that $A[j] \leq A[k]$ for $j<k\leq A.length$ 

After decrementing $j$ to $j-1$, if $A[j-1]$ is greater than $A[j]$, the invariant is preserved by exchanging $A[j-1]$ with $A[j]$ in line 4, making $A[j-1]\leq A[k]$ for $j-1<k\leq A.length$.

**Termination:**

The loop goes from $j=A.length​$ to $j=i+1​$, so at the end of the for loop we have that $A[i]​$ is the smallest element in the sub array $A[i+1…A.length]​$ .

#### 2-2.c

Loop Invariant for the for loop in lines 1-4: $A[1…i - 1]$ is an sorted subarray of the smallest $ i-1$ elements of $A$ (ascending order)

**Initiation:**

$i=1$ prior to the first iteration, so $A[1…i-1]$ is an empty subarray and sorted by default.

**Maintenance:**

By the for loop in lines 2-4, the element $A[i]$ becomes the smallest element out of the subarray $A[i…A.length]$. $A[1…i-1]$ is already a sorted subarray of the smallest $i-1$ elements of $A$, so the next smallest element is the smallest element in the subarray $A[i…A.length]$, being $A[i]$, which is larger than all previous elements. By increment $i$, the invariant is preserved as $A[1…i]$ is an sorted subarray of the smallest $i$ elements of $A$

**Termination:**

$i=A.length-1$  at the end, by the invariant, we have that $A[1…A.length-1]$ is a sorted subarray of the smallest $A.length-1$ elements of $A$. By default, $A[A.length]$ must be the largest element, so we end with a sorted array $A$

#### 2-2.d

The worst case running time of bubblesort is $\Theta(n^2)​$ as 

```pseudocode
for i = 1 to A.length - 1
	for j = A.length downto i + 1
		if A[j] < A[j-1]
			exchange A[j] with A[j-1]
```

Let $n = A.length​$ 

line 1: n 

line 2: $\sum^{n-1}_{i=1}(n-i+1)$

line 3: $\sum^{n-1}_{i=1}(n-i)​$

line 4: $\sum^{n-1}_{i=1}(t_i)$ where $t_i=$ number of times $A[j]<A[j-1]$ for that $i$

In the worst case, $t_i = n-i$, meaning each time we check the if statement line 3, it evaluates true and we perform a swap

The total run time is evaluated as follows where $c_i=$ the time it takes to run line $i$ 

$T(n) = c_1n+c_2\sum^{n-1}_{i=1}(n-i+1)+c_3\sum^{n-1}_{i=1}(n-i)+c_4\sum^{n-1}_{i=1}(t_i)$

Looking for the worst case scenario and applying some identities we have:

$T(n) = c_1n + c_2(\frac{(n-1)(n)}{2}+n-1) + c_3(\frac{(n-1)(n)}{2}) + c_4(\frac{(n-1)(n)}{2})$

$T(n) = (c_1+c_2)n + (c_2 + c_3 + c_4)(\frac{n^2-n}{2}) - c_2​$

Clearly, $T(n)=an^2+bn+c$ for some $a,b,c$ determined by the $c_i$'s

Leading to a time complexity in the worst case of $\Theta(n^2)​$

Generally, insertion sort should be faster as bubblesort makes much more swaps? or more comparisons

### 2-3 Correctness of Horner's Rule

Horner's Rule, evaluating 

$P(x) = \sum^n_{k=0}a_kx^k​$

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

Considering the loop invariant: $y=\sum^{n-(i+1)}_{k=0}(a_{k+i+1}x^k)​$

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

We have the left array and right array, a total of $2m​$ elements to be merged together into one array. $m​$ is the size of both arrays.

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

$O(g(n,m)) = \{f(n,m):\exists c,n_0,m_0 > 0 \text{ such that } 0 \leq f(n,m) \leq cg(n,m) \text{ for all } n\geq n_0 \text{ or } m\geq m_0 \}​$.

$\Theta(g(n,m)) = \{f(n,m):\exists c_1,c_2,n_0,m_0 > 0 \text{ such that } 0\leq c_1g(n,m) \leq f(n,m) \leq c_2g(n,m) \text{ for all } n\geq n_0 \text{ or } m\geq m_0 \}$.

$\Omega(g(n,m)) = \{f(n,m):\exists c,n_0,m_0 > 0 \text{ such that } 0 \leq cg(n,m) \leq f(n,m)  \text{ for all } n\geq n_0 \text{ or } m\geq m_0 \}​$.

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

Consider ​$p(n)/n^{d} = \sum_{i = 0}^d a_i n^{i-d}$

$p(n) \leq cn^k \implies \sum_{i = 0}^d a_i n^{i-d} \leq c​$ 

$c = a_d + b \geq  \sum_{i = 0}^{d-1} a_i n^{i-d}$

Setting $b=1$, $n_0 = max(da_{d-1}, da_{d-2}^{1/2},…,da_{0}^{1/d})$

We then establish that $p(n) \leq cn^k$ for $n \geq n_0 $ thus implying that $p(n) = O(n^d)$

Using the above, a,b,c,d,e are self explanatory. (Set b=-1 for Omega)

#### 3-1.b

#### 3-1.c

#### 3-1.d

#### 3-1.e

### 3-2 Relative Asymptotic Growths

Is $A$ $O,o,\Omega,\omega,\Theta$ of $B$? Assume $k ≥ 1, \epsilon > 0, c > 1​$ are constants.


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

$e^n​$

$2^n$

$\frac{3}{2}^n$

$\lg{n}^{\lg{n}}$





$2^{\sqrt{2\lg{n}}}$

$2^{\lg^*{n}}​$



$n^3​$

$n^2$, $4^{\lg(n)}$

$\lg(n!)$, $n\lg(n)$

$n$, $2^{\lg(n)}$



$\ln(n)​$

$\ln(\ln(n))$

$\lg^*{n}​$

$\lg^*{(\lg{n})}​$



### 3-4 Asymptotic Notation Properties

$f(n),g(n)$ be asymptotically positive functions. Prove or disprove the following

#### 3-4.a 

$f(n) = O(g(n))$ does not imply $g(n) = O(g(n))$, consider $f(n) = n$ $g(n) = n^2$

#### 3-4.b

$f(n) + g(n)​$ does not equal $\Theta(\min(f(n),g(n)))​$, consider $n + n^5​$

#### 3-4.c

$f(n) =O(g(n))​$ implies $\lg{f(n)} = O(\lg{g(n)})​$, where $f(n), g(n) \geq 1​$ for sufficiently large $n \geq n_0​$

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



$\Omega ^ {\infty}​$ (read "omega infinity") for this alternative definition. We say that $f(n) = {\Omega}^{\infty}(g(n))​$ if there exists
a positive constant $c​$ such that $f(n) \ge cg(n) \ge 0​$ for infinitely
many integers $n​$.

#### 3-5.a INCOMPLETE

Given $f(n), g(n)$ are asymptotically non-negative

Show that either $f(n) = O(g(n))​$ or $f(n) = {\Omega}^{\infty}(g(n))​$ or both, 
whereas this is not true if we use $\Omega​$ in place of 
${\Omega}^{\infty}​$.

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

#### and maintain all other constants the same.

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

$f(n) = n^{1/k}​$ for $k \ge 2​$ 

$f_c^*(n) = \Theta(\log_k{\log_c{n}})​$

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

A $O(n)​$ algorithm for finding the maximum subarray.

Some math first:

This uses the observation that the maximum subarray of $A[1…j+1]$ is either the maximum subarray of $A[1…j] = A[b…c]$ or a subarray $A[i…j+1]$ for $1 \le i \le j+1, 1 \le b,c \le j$. This observation is true as this encapsulates all possible subarrays, and thus one of which must be the maximum subarray.

We make the next observation that when incrementing $j$, the maximum subarray of $A[1…j+1]$ will always be the maximum subarray of $A[1…j] = A[b…c]$ unless the sum of the elements in $A[c+1…j+1]$ is positive. Let $S(A[t_1…t_2])$ denote the sum $A[t_1]+A[t_1+1]+…+A[t_2]$

When incrementing $j$, the new max subarray leftmost element index will always be at least $b$. Assume for the sake of contradiction the leftmost element index is not $b$. Then there's a subarray $A[b_2…b-1]$ whose sum is positive and would increase the maximum array sum. But then the maximum subarray of $A[1…j]$ wouldn't be $A[b…c]$ as $A[b_2…b-1,b…c]$ has a larger sum, a contradiction. That said, the leftmost element index may increase.

Additionally, if the new max subarray leftmost element index is $b_3 \not= b$, then it must be $> c$

If $b < b_3 \le c​$ then $S(A[b_3…c]) < S(A[b…c])​$, and so if the new max subarray includes an element between $b​$ and $c​$ indices, then the leftmost element index must be $b​$ as this will maximize the sum. Otherwise if the new max subarray doesn't include an element between $b​$ and $c​$ indices, then the leftmost element index $> c​$

Knowing the above, we now have that the maximum subarray of $A[1…j+1]$ is either $A[b…c]$, or $A[b…j+1]$ or $A[i…j+1]$ where $i > c$.

It will now be shown that the maximum subarray of the form $A[i…j+1]$ must either be $A[j+1]$ or the max subarray of $A[c+1….j]$ with $A[j+1]​$ added to it.

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

It should be noted that at line 4, it is much better to set when $n \le N$, where $N$ could be 1024, we should then compute $C$ with a the classic $\Theta(n^3)$ non-recursive algorithm as this would involve less function calls and a lot less operations of just adding and subtracting.

#### 4.2-3

How can Strassen's algorithm be modified to multiply square matrices in which its size is not an exact power of 2? Does it run in $\Theta(n^{\lg{7}})$?

We can increase the size of the square matrices by padding the additional rows and columns of 0's. This is essentially done by copying into a new array of size $n_2 \times n_2$ where $n_2 \ge n$ and $n_2$ is a power of 2. In fact, $n_2 = 2^{\lceil\lg{n}\rceil}.$ Creating a new array of size $n_2 \times n_2$ and copying values into it clearly takes $\Theta(n_2^2) =\Theta(n^2)$ because $\Theta(\lceil \lg{n} \rceil) = \Theta(\lg{n})$. $n^2 = o(n^{\lg{7}})$, so Strassen's still runs in $\Theta(n^{\lg{7}})$

#### 4.2-4 INCOMPLETE

What is the largest $k$ such that if you can multiply $3 \times 3$ 
matrices using $k$ multiplications (not assuming commutativity of 
multiplication), then you can multiply $n \times n$ matrices is time
$o(n^{\lg 7})​$? What would the running time of this algorithm be?

We would divide a matrices into 9 square sub-matrices of size $n/3$

Then $T(n) = k T(n/3) + \Theta(n^2)$

#### 4.2-5 INCOMPLETE

#### 4.2-6

Multiply a $kn\times n$ matrix by an $n\times kn$ matrix using Strassen's as an subroutine would result in padding the input matrices into $kn \times kn$ matrices, then the algorithm run time would be $\Theta((kn)^{\lg{7}})$

For multiplying a $n \times kn$ matrix by an $kn \times n$ matrix, (output matrix has rows A x columns B), we output a $n \times n$ matrix. 

