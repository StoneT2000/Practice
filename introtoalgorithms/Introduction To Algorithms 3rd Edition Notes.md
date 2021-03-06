

## 0 Basic Maths I should probably know

"$:$" means such that

#### Sets

$A\subseteq B$ means that A is a subset of B, all elements of A are in B (or $x \in A \implies x\in B$)

$A\subset B$ means that all elements of A are in B but $A \not= B$

# I Foundations

## 3 Growth of Functions

$\Theta(g(n))$ denotes the set of functions = $\{f(n):\exists c_1,c_2,n_0 > 0 \text{ such that } 0 \leq c_1g(n)\leq f(n) \leq c_2g(n) \text{ for all } n\geq n_0\}$

Essentially saying that $f(n)$ is equal to $g(n)$ within a constant factor, and so $g(n)$ is an **asymptotically tight bound** for $f(n)$. $f(n)$ must also be **asymptotically non-negative** ($f(n) \geq 0$ for sufficiently large $n$)



$O(g(n))=$$\{f(n):\exists c,n_0 > 0 \text{ such that } 0 \leq f(n) \leq cg(n) \text{ for all } n\geq n_0\}$. **An asymptotic upper bound**

$\Omega(g(n))=$$\{f(n):\exists c,n_0 > 0 \text{ such that } 0 \leq cg(n) \leq  f(n) \text{ for all } n\geq n_0\}$. **An asymptotic lower bound**

Example of asymptotically tightness: $3n^3 + 3n-3 = O(n^3)$ is tight if $3n^3+3n-3 = \Theta(n^3)$ as well, true due to the following

$c_1n^3\leq 3n^3 + 3n - 3\leq c_2n^3 \implies c_1\leq 3 + \frac{3}{n^2} - \frac{3}{n^3} \leq c_2$. As $c_1,c_2$ are constant and tightly bound a function above and below, we have that $3n^3 + 3n - 3 = O(n^3)$ is tight.

![growthrates](assets/growthrates.png)

The statement $f(n) = O(g(n))$ merely claims that some constant multiple of $g(n)$ is an upper bound for $f(n)$, with no claims as to how tight the bound is.

Saying that the running time of $f(n)$ is $O(n^2)$ usually means the worst case running time is $O(n^2)$ as that statement applies for any input of size $n$.

Saying that the running time of $f(n)$ is $\Omega(n^2)$ usually means the best case running time is $\Omega(n^2)$ as that statement applies for any input of size $n$.

Note that due to the nature of the set definitions, clearly $\Theta(g(n)) \subseteq O(g(n)), \Omega(g(n))$

**Theorem 3.1**

For any two functions $f(n), g(n)$, we have that $f(n) = \Theta(g(n))$ if and only if $f(n) = O(g(n))$ and $f(n) = \Omega(g(n))$

Proof:

We first prove the forwards direction,

If $f(n)=\Theta(g(n))$, then $0 \leq c_1g(n) \leq f(n) \leq c_2g(n)$ for all $n\geq n_0$ for constants $c_1,c_2,n_0$.

As  $0 \leq f(n) \leq c_2g(n)$, by definition we have $f(n) = O(g(n))$

$0 \leq c_1g(n) \leq f(n)$, by definition we have $f(n) = \Omega(g(n))$

Backwards direction

If $f(n) = O(g(n))$ and $f(n) = \Omega(g(n))$, we have that $0 \leq f(n) \leq c_2g(n)$ for $n \geq n_2$, $0 \leq c_1g(n) \leq f(n)$ for $n \geq n_1$

Let $n_0 = max(n_1,n_2)$

Then clearly $0 \leq c_1g(n) \leq f(n) \leq c_2g(n)$ for all $n\geq n_0$, showing that $f(n) = \Theta(g(n))$

**Example of using these terms correctly!**

Consider Insertion sort

The running time of insertion sort is $\Omega(n)$ and is also $O(n^2)$, which is correct as insertion sort's running time falls between a linear to quadratic function of $n$. These bounds are also asymptotically tight. Saying the running time is $\Omega(n^2)$ is incorrect as there exists an input of $n$ (array of $n$ sorted elements), of which insertion sort runs in $\Theta(n)$ time. It is correct to say that the worst-case running time of insertion sort is $\Omega(n^2)$ as there exists an input that causes the algorithm to take $\Omega(n^2)$ time.

$4n^2+3n-2 = 4n^2 + \Theta(n)$ is correct and the $\Theta(n)$ represents a function $f(n) \in \Theta(n)$, one of which could be $f(n) = 3n-2$

Asymptotic notation can also appear on the left side of an equation e.g

$4n^2 + \Theta(n) = \Theta(n^2)$, which is fine as there is  always a way to choose an anonymous function on the right side to make it valid. The right side provides a coarser level of detail than the left (is more loose)

Not all bounds provided by $O$-notation is asymptotically tight, so this is where $o$-notation comes in handy.

E.g, we have that $3n^2 = O(n^2)$ is asymptotically tight as they are within a constant factor of each other

$o(g(n))= $ $\{f(n):\text{ for every } c>0, \exists n_0 > 0 \text{ such that } 0 \leq f(n) < cg(n)\text{ for all } n\geq n_0\}$. **An asymptotic upper bound that is not tight**. e.g $n^2 = o(n^3), n^2 \not= o(n^2)$. Difference with $O$ is that this holds for all $c$.

Intuitively, $f(n)$ becomes insignificant: $\lim_{n \rightarrow \infty} \frac{f(n)}{g(n)}= 0 $, another definition of o-notation

$\omega(g(n))= $$\{f(n):\text{ for every } c>0, \exists n_0 > 0 \text{ such that } 0 \leq cg(n) < f(n) \text{ for all } n\geq n_0\}$. **An asymptotic lower bound that is not tight**.

$\omega$ is to $\Omega$ is analogous to $o$ is to $O$. Another definition is that $f(n) \in \omega(g(n))$ if and only if $g(n) \in o(f(n))$

$\lim_{n \rightarrow \infty} \frac{f(n)}{g(n)}= \infty$, another definition of $\omega$-notation

**Nice Corollary?**

If $A$ is $o(B)$, then $A$ is also $O(B)$

If $A$ is $\omega(B)$, then $A$ is also $\Omega(B)$

Simple proof:

Given $f(n) = o(g(n))$, then $0 \leq f(n) < cg(n)$ for every $c$ and for all $n \geq n_0=$ a constant.

Then choose a $c_1 =$  a particular $c$ and $n_0$

Then clearly $0 ≤ f(n) < c_1g(n)$ for $n≥n_0$, implying $0 \leq f(n) \leq c_1g(n)$ for the same $n$, so $f(n) = O(g(n))$. $\leq$ is more loose than $<$ so this is allowed.

#### Comparing Functions

**Transitivity:**

$f(n) = X(g(n))$ and $g(n) = X(h(n))$ $\implies$ $f(n) = X(h(n))$, where $X \in \{\Theta, O, \Omega, o, \omega \}$

Proof: $f(n) = X(g(n)) \implies 0 \leq c_1g(n) \leq f(n) \leq c_2g(n)$

$g(n) = X(h(n)) \implies 0 \leq t_1h(n) \leq g(n) \leq t_2h(n) \implies 0 \leq c_1t_1h(n) \leq c_1g(n), \space c_2g(n) \leq c_2t_2h(n)$

Then $0 \leq c_1t_1h(n) \leq f(n) \leq c_2t_2h(n)$, and as $c_1t_1, c_2t_2$ are constants, this implies $f(n) = X(h(n))$

**Reflexivity:**

$f(n) = X(g(n))$ and $g(n) = X(h(n))$ $\implies$ $f(n) = X(h(n))$, where $X \in \{\Theta, O, \Omega \}$

**Symmetry:**

$f(n) = \Theta(g(n))$ if and only if $g(n) = \Theta(f(n))$

**Transpose Symmetry:**

$f(n) = O(g(n))$ if and only if $g(n) = \Omega(f(n))$

$f(n) = o(g(n))$ if and only if $g(n) = \omega(f(n))$

Due to the above, an analogy can be drawn between comparing asymptotic functions and comparing two real numbers $a,b$

$f(n) = \Theta(g(n))$ is like $a = b$

$f(n) = O(g(n))$ is like $a \leq b$

$f(n) = \Theta(g(n))$ is like $a \geq b$

$f(n) = o(g(n))$ is like $ a < b$

$f(n) = \omega(g(n))$ is like $a > b$

We say that $f(n)$ is **asymptotically larger** than $g(n)$ if $f(n) = \omega(g(n))$ 

We say that $f(n)$ is **asymptotically smaller** than $g(n)$ if $f(n) = o(g(n))$ 

However, the property of trichotomy does not carry over

**Trichotomy (try-ka-ta-me)**

For any two real numbers $a,b$, one of the following must be true, $a<b$, $a=b$, or $a>b$

All real numbers can be compared, but not all functions are **asymptotically comparable**. It may be that neither $f(n) = O(g(n))$ nor $f(n) = \Omega(g(n))$ holds. For example, $n$ and $n^{1+sin(n)}$ can't be compared as $n^{1+sin(n)}$ ranges from $n^0$ to $n^2$, taking on all values in between.



**Standard notations and common functions:**

Know monotonicity, floors and ceilings, modular arithmetic, polynomials, exponentials, Maclaurin/Taylor series expansions, logs, factorials, and the following

$f(n)$ is **polynomially bounded** if $f(n) = O(n^k)$ for some constant $k$

$f(n)$ is **polylogarithmically bounded** if $f(n) = O(\lg^k(n))$ ($\lg$ refers to $\log_2$)

$n^b = o(a^n)$ as $lim_{n \rightarrow \infty} \frac{n^b}{a^n} = 0$ for all $a,b$ and $a>1$

$n! = \sqrt{2\pi n} (\frac{n}{e})^n (1 + \Theta(\frac{1}{n}))$ **Stirling's Approximation**

$n! = \sqrt{2\pi n}(\frac{n}{e})^n e^{\alpha_n}$ Where $\frac{1}{12n+1} < \alpha_n < \frac{1}{12n}$

**Functional iteration**

$f^{(i)}(n)$ denotes the function $f(n)$ iteratively applied $i$ times to an initial value of $n$. Can be recursively defined as $f^{(i)}(n)$ = $f(f^{(i-1)}(n)))$ if $i>0$, 

**The iterated logarithm function**

$\lg^*n$ (log star of $n$) denotes the iterated logarithm function

$\lg^*n = \min\{ i \geq 0 : \lg^{(i)}n \leq 1\}$; So $\lg^*2 = 1, \lg^*16 = 3$ (lg(lg(lg(16))) = 1)



## 4 Divide-And-Conquer

We divide and conquer a problem by performing the 3 steps at each of level of recursion

**Divide** the problem into a number of subproblems that are smaller instances of the same problem.

**Conquer** the subproblems by solving them recursively. If the subproblem sizes are small enough, however, just solve the subproblems in a straightforward manner.

**Combine** the solutions to the subproblems into the solution for the original problem.

When subproblems are large enough to solve recursively, it is called **recursive case**

When subproblems are small enough such that we don't recurse, the recursion **bottoms out** and we have gotten down to the **base case**.

Merge-sort is a classic example of using divide-and-conquer and its worst case running time $T(n)$ is 
$$
T(n) =
\begin{cases} 
\Theta(1) & \text{if } n=1 \\
2T(n/2) + \Theta(n) & \text{if } n>1 \\
\end{cases}
$$
Of which it can be shown that $T(n) = \Theta(n\lg{n})$

Three main methods for obtaining an $\Theta$ or $O$ bound on an algorithm.

- **Substitution method** guesses a bound and then utilizes induction to prove the guess is correct.

- **Recursion-tree method** converts the recurrence into a tree whose nodes represent the costs incurred at different levels of the recursion. Through summations, the bounds can be found.

- **Master method** provides bounds for recurrences of the form $T(n) = aT(n/b) + f(n)$

  where $a \ge 1,\ b>1,$ and $f(n)$ is a given function. For divide and conquer, that would characterize dividing a problem into $a$ sub problems of size $1/b$ of the original problem, of which dividing and combining takes $f(n)$ time.

#### Technicalities in recurrences

Sometimes you can divide into a even sized sub problems or an integral sized sub problem, such as an odd input and using merge-sort. Additionally, boundary conditions, such as the solution to the recurrence for say $n<2$ that differ from the general solution are typically ignored.

These conditions are generally ignored as they won't change the run time by more than a constant factor, and thus bounds on the order of growth remain the same.

When solving recurrences, we omit floors, ceilings, and boundary conditions and determine later if they matter or not. Usually they don't, but its important to recognize when they do, of which experience and some theorems help with.

### 4.1 Maximum-Subarray Problem

The problem asks to find the contiguous subarray $A[b…c]$ of $A$ that has the largest array sum, where the array sum of $A[b…c]$ is $A[b]+A[b+1]+…+A[c]$.

A brute force method would compute the sum of all $n\choose2$ possible contiguous subarrays and find the maximum one. This clearly runs in $\Theta(n^2)$ time.

#### Divide and Conquer Solution

We divide the array into two halves, $A[low…mid],\ A[mid+1…high]$

We observe that any contiguous subarray $A[i…j]$ of $A[low…high]$, and thus the maximum subarray of $A[low…high]$ must be in the following

- Entirely in the $A[low…mid]$
- Entirely in $A[mid+1…high]$
- Crosses the midpoint, so $low \le i \le mid \le j \le high$

We can find the maximum subarray of $A[low…mid], \ A[mid+1…high]$ recursively as these are subproblems

However, finding the maximum subarray that crosses the midpoint is a different problem.

![fig4.4](assets/fig4.4.png)

It can be approached by finding the maximum subarray of $A[i…mid]$ and $A[mid+1…j]$ and combining the two, combining if they are larger than 0. As they must include element $A[mid]$ and $A[mid+1]$, we can solve this in $\Theta(n)$ time.

So a recursive solution can be done by finding the maximum subarray of $A[low…mid]$ and $A[mid+1…high]$ where $mid = floor((low+high)/2)$, and the maximum subarray of the arrays that cross the midpoint. Which ever of those maximum subarrays have the highest sum is then returned at each recursive step.

We can compute the worst case run time $T(n)$ as follows

At each recursive step, we compute the max subarray of $A[low..mid], \ A[mid+1…high]$, so that takes $2T(n/2)$ time. We also compute the maximum crossing subarray, which takes $\Theta(n)$ time. There are probably some other constant time factors, so we also add a $\Theta(1)$ (Such as checking which of the maximum subarrays has the higher array sum)

Thus, $T(n) = 2T(n/2)  + \Theta(n) + \Theta(1) = 2T(n/2)  + \Theta(n) $
$$
T(n) =
\begin{cases} 
\Theta(1) & \text{if } n=1 \\
2T(n/2) + \Theta(n) & \text{if } n>1 \\
\end{cases}
$$
Which is equivalent to the merge-sort algorithm, and so clearly finding the maximum subarray in this way will be $\Theta(n\lg{n})$

### 4.2 Strassen's Algorithm for Matrix Multiplication

A naive implementation of an algorithm to multiply two $n \times n$ matrices would take $\Theta(n^3)$ time as there are $n^2$ entries, and each entry is the sum of $n$ values, leading to a triply nested loop algorithm that takes $\Theta(n^3)$ time.

#### Simple divide and conquer solution

For now, assume $n$ is a power of 2. For computing $C = A \cdot B$, consider a 4-way partition of them as so

![eqn4.9](assets/eqn4.9.png)

The equation above shows that

$C_{11} = A_{11} \cdot B_{11} + A_{12} \cdot B_{21}$

$C_{12} = A_{11} \cdot B_{12} + A_{12} \cdot B_{22}$

$C_{21} = A_{21} \cdot B_{11} + A_{22} \cdot B_{21}$

$C_{22} = A_{21} \cdot B_{12} + A_{22} \cdot B_{22}$

These each specify the multiplications of two $n/2 \times n/2$ matrices and the addition of their $n/2 \times n/2$ products. A simple recursive algorithm can then be written, with the the base case being a matrix of size $1 \times 1$

The partitioning part of the algorithm can be done in $\Theta(1)$ time by using index calculations instead of performing an $\Theta(n^2)$ copying algorithm.

If the runtime of the algorithm is $T(n)$, then multiplying the matrices in the subproblems takes $T(n/2)$ time. Performing the additions of the matrices, each of size $n/2 \times n/2$ implies $n^2/4$ additions each, so this is done in $\Theta(n^2)$. 

The total run time of the algorithm $T(n)$ is then
$$
T(n) = 8T(n/2) + \Theta(n^2)
$$
Note that the $8$ can't be removed as it impacts the recursive part of the run time. 

Using the master theorem that will be explained later, it can be shown that $T(n) = \Theta(n^3)$, no real improvement to the run time unfortunately. 

#### Strassen's Method

Strassen's method improves the run time by making the recursion tree slightly less bushy. That means it performs less recursive calls. Strassen's method performs 7 recursive multiplications of $n/2 \times n/2$ matrices instead of 8.

> Strassen’s method is not at all obvious. (This might be the biggest understatement
>
> in this book.) It has four steps:

1. Divide the input matrices $A,B$ and the output matrix $C$ into $n/2 \times n/2$ sub-matrices (like 4 quadrants). This takes $\Theta(1)$ time when using index calculations.
2. Create 10 matrices $S_1,…,S_{10}$, each of which is $n/2 \times n/2$ and is the sum or difference of two matrices created in step 1. These can all be created in $\Theta(n^2)$ time as they are matrix additions.
3. Using the sub-matrices from step 1, and $S_1,…,S_{10}$, recursively compute 7 matrix products $P_1,…,P_7$, each of size $n/2 \times n/2$.
4. Compute the output matrix $C$'s sub-matrices $C_{11}, C_{12}, C_{21}, C_{22} $ by adding and subtracting various matrices $P_i$ and then combine them into $C$. The addition of matrices and then combining $C_{11},…,C_{22}$ takes $\Theta(n^2)$ time.

This then shows that $T(n) = 7T(n/2) + \Theta(n^2)$, we were able to trade off one matrix multiplication with a constant number of matrix additions.

Using the master theorem, it can be shown that $T(n) = \Theta(n^{\lg{7}})$

Details of steps 2,3, and 4.

**Step 2:**

$S_1 = B_{12}-B_{22}$

$S_2 = A_{11} + A_{12}$

$S_3 = A_{21} + A_{22}$

$S_4 = B_{21} - B_{11}$

$S_5 = A_{11} + A_{22}$

$S_6 = B_{11} + B_{22}$

$S_7 = A_{12} - A_{22}$

$S_8 = B_{21} + B_{22}$

$S_9 = A_{11} - A_{21}$

$S_{10} = B_{11} + B_{12}$

A total of 10 sums of two $n/2 \times n/2$ matrices are computed, so a total of $10 \cdot \frac{n^2}{4}$ additions are made, $\Theta(n^2)$ run time.

**Step 3:**

$P_1 = A_{11}\cdot S_{1} = A_{11}\cdot B_{12} - A_{11} \cdot B_{22}$

$P_2 = S_2 \cdot B_{22} = A_{11} \cdot B_{22} + A_{12} \cdot B_{22}$

$P_3 = S_3 \cdot B_{11} = A_{21} \cdot B_{11} + A_{22} \cdot B_{11}$

$P_4 = A_{22} \cdot S_4 = A_{22} \cdot B_{21} - A_{22} \cdot B_{11}$

$P_5 = S_5 \cdot S_6 = A_{11} \cdot B_{11} + A_{11} \cdot B_{22} + A_{22} \cdot B_{11} + A_{22} \cdot B_{22}$

$P_6 = S_7 \cdot S_8 = A_{12} \cdot B_{21} + A_{12} \cdot B_{22} - A_{22} \cdot B_{21} - A_{22} \cdot B_{22}$

$P_7 = S_9 \cdot S_{10} = A_{11} \cdot B_{11} + A_{11} \cdot B_{12} - A_{21} \cdot B_{11} - A_{21} \cdot B_{12}$

As the $S_i$'s are known, only 7 matrix multiplications are needed. Additionally, each of the multiplications are sub problems so these are 7 recursive matrix multiplications.

**Step 4:**

$C_{11} = P_5 + P_4 - P_2 + P_6$

$C_{12} = P_1 + P_2$

$C_{21} = P_3 + P_4$

$C_{22} = P_5 + P_1 - P_3 - P_7$

These are matrix additions so this takes $\Theta(n^2)$ time.



Things to think about / I noticed

If you expand all the operations out, it works! Checking my JS file.

Note that Strassen's algorithm has a function call overhead and so recursively solving the matrix multiplications down to matrix sizes of 1 is inefficient and slow. Additionally, Strassen's algorithm, although does less multiplications, does a lot of extra additions and other operations just to multiply two $2 \times 2$ matrices if the recursion is done all the way to 1. So, a improvement would be to recurse all the way down to a $n$, lets say 64, and then run the classic $\Theta(n^3)$ algorithm for multiplying matrices. 

Things that impact the algorithm

- Condition for using classical algorithm
- Efficient padding. For computing the multiplication of 1025x1025 matrices, they are padded to 2048 sized square matrices, which is inefficient and leads to a lot of useless multiplications. Consider dynamic padding?



### 4.3 The Substitution Method for Solving Recurrences

Two steps

1. Guess the form of the solution
2. Use induction to find the constants and prove the solution works

Example Application

$T(n) = 2T(\lfloor n/2 \rfloor ) +n$

We guess that $T(n) = O(n\lg{n})$, so we must show that $T(n) \le cn\lg{n}$ for some $c > 0$ for all $n \ge n_0$

We assume that this bound holds for all $n > m = \lfloor{n/2}\rfloor$, then we have through manipulation and substitution


$$
T(\lfloor{n/2}\rfloor) \le c \lfloor{n/2}\rfloor \lg{(\lfloor{n/2}\rfloor)} \implies 2T(\lfloor{n/2}\rfloor) + n \le 2(c\lfloor{n/2}\rfloor \lg{\lfloor{n/2}\rfloor}) + n \\
T(n) \le 2(c\lfloor{n/2}\rfloor \lg{\lfloor{n/2}\rfloor}) + n
$$

Which then implies
$$
\begin{eqnarray}
T(n) & \le & cn \lg{(n/2)} + n \\
& = & cn \lg{(n)} - cn \lg{(2)} + n \\
& = & cn \lg{(n)} - cn + n \\
& \le & cn\lg{(n)}
\end{eqnarray}
$$
Which holds as long as $c \ge 1$

Induction requires that we show the solution works for the boundary conditions. We need to choose $c$ large enough such that the bound works for boundary conditions as well. However, note how $T(1) = 1$, but $c1\lg{(1)} = 0$, so the base case fails to hold

Remember that we get to choose the $n_0$ in  $n \ge n_0$, so observing how for $n > 3$, the recurrence doesn't depend directly on $T(1)$, it depends on $T(2)$ or higher. (its n>3 as floor(3/2) = 1)

With $T(1) = 1$, this implies $T(2) = 4,\ T(3) = 5$

So now we can complete the inductive proof by showing that for a $c$, $T(2) \le c2\lg(2)$, and $T(3) \le c3\lg(3)$

Turns out $c \ge 2$ is sufficient for base cases $n=2,3$ to hold.

**Making a good guess**

There's no good way. It takes experience and creativity and looking for patterns or connections with known bounds helps.

E.g it's obvious to guess that $T(n) = 2T(n + 17) + n$ is bounded by $\Theta(n \lg{n})$ as the $+17$ term becomes less important as $n$ grows larger. So the problem reduces down to one whose answer is known.

We may also first upper bound it and then lower bound it, and then eventually restrict the bounds to get an asymptotically tight one.

**Subtleties**

Remember the induction paradox? It applies here. Sometimes proving a stronger bound makes the math work out better e.g bounding by $cn-d$ for $d \ge 0$ instead of $cn$.

**Avoiding Pitfalls**

Consider 
$$
\begin{eqnarray}
T(n) & = &  2(c(\lfloor n/2 \rfloor)) + n \\
& \le & cn + n \\
& = & O(n)
\end{eqnarray}
$$
The above is wrong, we as we have no proved that $T(n)$ is less than the exact form of what was assumed, which in this case we assumed $T(n) \le cn$

 **Changing Variables**

Sometimes you can manipulate variables a bit to get a recognizable relation.



### 4.4 The recursion-tree method for solving recurrences

By drawing out a recursion-tree, a recurrence solution can be made, or at least a good guess can be made, which can then be proven using the substitution rule.

First at each depth level $i = 0,1,2,…$, we want to compute the run time at each node, and then sum all the nodes in the same level to get a runtime for that level. Then we sum all the runtimes for all the levels to get a overall runtime and bound it. This method could be direct proof if cases are handled correctly, but are usually good enough to provide a good guess for substitution later.



Example of a recurrence solution that can be proven directly with some mathematics, or provide a good guess for the runtime of a recursive algorithm.

**Good Guess Method**

Let $T(n)= T(n/3) + T(2n/3) + O(n)$

Letting $O(n) \le cn$, we have $T(n) \le T(n/3) + T(2n/3) + cn$

The longest path from a root to a leaf is the when we follow the $T(2n/3)$ term, so $n \rightarrow 2n/3 \rightarrow n(2/3)^2 \rightarrow …\rightarrow 1$

$n(2/3)^k = 1$, implying $k = \log_{3/2}{n}$ is the height of the tree. 

However, this tree isn't a complete binary tree and not all of its leaves go to a depth of $k$, and there aren't $2^{\log_{3/2}{n}}= n^{\log_{3/2}{2}}$ leaves at depth $k$

We might expect that as $\log_{3/2}{2} > 1$, the runtime is $\omega(n\lg{n})$. But, remember it's not a complete binary tree. Not all levels contribute a cost of $cn$ due to the non-binaryness of the tree. The missing internal nodes that would make it binary allow us to make a good guess that the runtime is indeed $O(n\lg{n})$, and so we tolerate the sloppiness here.

Guessing that $T(n) = O(n\lg{n})$, we assume that $T(n) \le dn\lg{n}$, for some $d>0$
$$
\begin{eqnarray}
T(n) & \le & d(n/3)\lg(n/3) + d(2n/3)\lg(2n/3) + cn \\
& = & (d(n/3)\lg(n)-d(n/3)\lg(3)) + (d(2n/3)\lg(n)+d(2n/3)\lg(2)-d(2n/3)\lg(3)) + cn \\
& = & dn\lg(n) - dn\lg(3) + d(2n/3) + cn \\
& \le & dn\lg(n)
\end{eqnarray}
$$
Where the last line is true provided that $\frac{c}{\lg(3)-2/3} \le d$

So we show that $T(n) = O(n\lg{n})$ (you can figure out the boundary details yourself)

**More Mathematical Method**

We can apply a mathematical treatment to this problem to show that it is clearly $O(n\lg{n})$

Consider at depth level $i$, there are normally $2^i$ nodes, unless the problem subdivides to a size $<1$, of which it's a constant time problem of time $T(1)=1$ or less.

Clearly, as the problem subdivides into a third or two thirds the original size, all nodes must be of size $(2^m/3^i)n$, where $i$ is the depth level, and $0 \le m \le i$

If $m=i$, that would mean we are looking at the nodes that were continuously split into 2/3 of the original size. Likewise, $m=0$, would be referring to nodes that were continuously split into 1/3 of the original size. Values of $m$ in between would reference nodes in between. 

Note that there are several ways in which a subproblem of size $(2^m/3^i)n$ can be achieved. There are in fact $i\choose{m}$ ways, which can be seen from a combinatorial argument. At each node, we create two child nodes that are either 1/3 or 2/3 of the original size. So at level $i$, we have created child nodes $i$ times, and so we choose a 1/3 or 2/3 subdivision of the original problem size $i$ times. The number of times we choose 2/3 is between $0$ and $i$, which is what $m$ is defined as. If we choose $1/3$, we don't change the numerator of $(2^m/3^i)n$, and just increment the denominator. Thus, for the $i$ different times we make that subdivision size decision, we can choose $m$ levels to make the decision to subdivide into 2/3 of the original size, leading to $i \choose m$ different appearances of the nodes of size $(2^m/3^i)n$ at level $i$.

To recap, at each level $i$, there are $2^i$ nodes, and $i\choose m$ nodes of size $(2^m/3^i)n$. Remembering that there is also the $O(n)$ factor in $T(n)$, the root size is $n$ and the non recursive portion takes $cn$ time. Thus, we can compute the total running time $T_i(n)$ at level $i$ as
$$
\begin{eqnarray}
T_i(n) & = & c \sum_{m=0}^{2^i} {i \choose m}{\frac{2^mn}{3^i}} \\
& = & cn \sum_{m=0}^{2^i} {i \choose m}{\frac{2^m}{3^i}} \\
& = & cn (\frac{2}{3} + \frac{1}{3})^{2^i} \\
& = & cn
\end{eqnarray}
$$
However, $T_i(n) = cn$ only when $i \le \lceil \log_{3}{n} \rceil$, the shortest path length from root to a leaf. We can say that $T_i(n) \le cn$ for all $i$.

If we assume that we have a complete binary tree and all nodes of size less than 1 aren't disregarded, we can see that $T_i(n) = cn$ for all $i$, and this would mean that we will overestimate $T(n)$. Then $T(n) \le cn\log_{3/2}{n}$.

If we assume that the binary tree stops at $i = \log_3{n}$, then by summing all of the levels, we would be underestimating $T(n)$. Then $T(n) \ge cn\log_3{n}$

Thus, we can bound $T(n)$ by $\Omega(n\log_3{n})$, and $O(n\log_{3/2}{n})$

As the lower and upper bound are within a constant factor of $n\lg{n}$, which imply $T(n) = \Theta(n\lg{n})$

We've already shown that $T(n) = O(n\lg{n})$, we can use substitution to show $T(n) = \Omega(n\lg{n})$
$$
\begin{eqnarray}
T(n) & \ge & d(n/3)\lg(n/3) + d(2n/3)\lg(2n/3) + cn \\
& = & (d(n/3)\lg(n)-d(n/3)\lg(3)) + (d(2n/3)\lg(n)+d(2n/3)\lg(2)-d(2n/3)\lg(3)) + cn \\
& = & dn\lg(n) - dn\lg(3) + d(2n/3) + cn \\
& \ge & dn\lg(n)
\end{eqnarray}
$$
The last line is true provided $\frac{c}{\lg(3)-2/3} \ge d$

Thus, we confirm that $T(n) = \Theta(n\lg{n})$, although it was not needed.

### 4.5 The master method for solving recurrences

The master method solves recurrences of the form 
$$
T(n) = aT(n/b) + f(n)
$$
where $a \ge 1, \ b > 1$ are constants and $f(n)$ is asymptotically positive.

The recurrences describe a problem that subdivides into $a$ subproblems of size $n/b$ and dividing and combining results takes $f(n)$ time. This is not technically rigorous as $n/b$ may not be integral. But replacing $T(n/b)$ with $T(\lceil n/b \rceil)$ or $T(\lfloor n/b \rfloor)$ won't impact the asymptotic behavior of the solution.

![theorem4.1](assets/theorem4.1.png)

This is intuitive as the solution to $T(n)$ is the larger of $\Theta(n^{\log_b{a}})$ and $\Theta(f(n))$

For 2, we just multiply by a logarithmic factor.

However, observe that for 1 and 3, $f(n)$ must be asymptotically smaller or larger polynomially by a factor of $n^\epsilon$. For the third case, there is the additional "regularity" constraint that $af(n/b) \le cf(n)$ for $c < 1$ and sufficiently large $n$, usually is satisfied by most polynomially bounded functions. The regularity constraint essentially says that all the $f(n)$ of the sub problems, all the time it takes to divide and combine the $a$ sub-problems of size $n/b$ is upper bounded by the time it takes to divide and combine the original size $n$ within a constant factor of less than $1$. 

Note that this master theorem doesn't cover all cases, e.g when $f(n)$ is not polynomially larger or smaller, or when the 

**Examples**

$T(n) = 3T(n/4) + 1$)

$T(n) = 3T(n/4)+ n\lg{n}$

$n\lg{n} = \Omega(n^{log_4(3)+\epsilon})$, where $\epsilon \approx 0.2$ as we know $n\lg{n} = \Omega(n)=\Omega(n^{\log_4{3}}+\epsilon)$ ($\log_4{3} \approx 0.793$)

The regularity condition is holds for $n\lg{n}$; for sufficiently large $n$

$3(n/4)\lg(n/4) \le c n \lg {n}$, of which $c = 3/4 < 1$ works. By case 3, the solution to the recurrence is $T(n) = \Theta(n\lg{n})$

$T(n) = 2T(n/2) + n\lg{n}$

$n^{\log_b{a}}=n$, but note that $n\lg{n}$ is not polynomially larger than $n$, as the $\lg{n}$ term is polynomially bounded.



## 5 Probabilistic Analysis and Randomized Algorithms

### 5.1 The hiring problem

Consider the problem of hiring a new office assistant. An employment agency sends a new candidate each day. It costs money to interview a candidate and even more to fire the current assistant and hire a new one.  To have the best person for the job, you always interview and hire the candidate if it is better than the current one. 

```pseudocode
best = 0 //least qualified dummy candidate
for i = 1 to n
	interview candidate i
	if candidate i is better than candidate best
		best = i
		hire candidate i
```

We can analyze the above function by not analyzing run time, but costs.

The total cost with this algorithm is $O(c_i n + c_h m)$ where $m$ is the number of times we hire a candidate, $c_i, c_h$ are the costs to interview and hire.

$c_h m$ varies with each run whereas $c_in$ is fixed as we interview all candidates.

**Worst Case Analysis**

We hire every candidate, costs $O(c_hn)$

**Probabilistic Analysis**

Using probability to analyze problems.

In order to perform this kind of analysis, we need information on the distribution of inputs or make assumptions about it. Then we analyze the algorithm for an average-case running time by taking an average over the distribution of all possible inputs. This running time is the **average-case running time**

For the hiring problem, we could assume that the applicants come in random order.

As any two applicants can be compared and one can be determined as better than the other, there is a total order on the candidates. We can rank each applicant with permutation $rank$, so the ordered list $\{rank(1), rank(2), …, rank(n)\}$is a permutation of the list $\{1,2,…,n\}$. So if the input is random, it is the same as saying that this list of ranks is equally likely to appear as any one of the $n!$ permutations of the numbers $1$ through $n$. Alternatively we say the ranks form a **uniform random permutation**, each of the possible permutations occur with equal probability.

**Randomized Algorithms**

We can often use probability and randomness as a tool in designing better algorithms by making part of the algorithm's behavior random.

In the hiring problem, we can't determine if the candidates re being presented to us in random order even if it appears to be the case. In order to develop a randomized algorithm, we need more control over how we get new candidates. Suppose now that the employment agency has $n$ candidates and a list of these candidates are sent in advance (as if the input is an array of all the candidates and not a linked list)

Each day, we randomly choose a candidate to interview. Now, we have enforced a random order.

Generally, we call an algorithm **randomized** if its behavior is determined not only by its input but also by values produced by a **random-number-generator**. Assume we have such a generator called Random, where Random(a,b) returns an integer between a and b inclusive with equal probability.

In practice, you will have a **pseudo-random-number-generator**, a deterministic algorithm that returns numbers that "look" statistically random.

When analyzing the run time of a randomized algorithm, we take the expectation of the running time over the distribution of values returned by the random number generator. This is the **expected running time**.

To recap, **average-case-running time** is for when the probability distribution is over the inputs of the algorithm (we know the likelihood of every possible input), and **expected-running-time** is for when the algorithm itself makes random choices.

### 5.2 Indicator Random Variables

Indicator random variables provide a convenient method to convert from probability to expectations
$$
I\{a\} = 
\left\{
\begin{eqnarray}
1 && \text{if } A \text{ occurs}, \\
0 && \text{if } A \text{ occurs}.
\end{eqnarray}
\right.
$$
Consider a coin flip, let $X_h$ be the indicator random variable associated with the coin turning up heads

$X_h = I\{H\}$, which equals $1$ if heads, $0$ if tails (otherwise).
$$
\begin{eqnarray}
E[X_h] && = && E[I\{H\}] \\
&& = && 1 \cdot \Pr\{H\} + 0 \cdot \Pr\{T\} \\
&& = && 1 \cdot (1/2) + 0 \cdot (1/2) \\
&& = && 1/2
\end{eqnarray}
$$
We can conclude with the lemma that $E[X_A] = \Pr\{A\}$ where $A$ is an event in sample space $A$, $X_A = I\{A\}$



**Powerful technique of using this**. due to linearity of expectation (for example when find expected number of heads in $n$ tosses). It applies even when there is **dependence among variables**.

Back to the hiring problem, we let $X_i$ be the indicator random variable $I\{\text{candidate i is hired}\}$

As all candidates come in random order, any one of the candidates between $1$ to $i$ can be the best qualified of them all, meaning that there is a probability $1/i$ that candidate $i$ is better than candidates $1$ to $i-1$, so $\Pr\{\text{candidate i is hired}\} = 1/i$, implying $E[X_i] = 1/i$, implying $E[X] = X_1+X_2+…+X_n=ln(n)+O(1)$

The last step being an mathematical approximation of the nth harmonic series.



### 5.3 Randomized Algorithms

We were able to determine average case run times for the hiring problem provided that the candidates arrived in random order. We can ensure this occurs for all inputs by randomizing our algorithm, by randomly permuting the input candidates to enforce randomization. This then ensures that for *any* input, the expected run time or hire times is $\ln{(n)}$.

The original hiring algorithm is deterministic as its hire count depends on the input. Therefore, sometimes we might enter the worst case scenario. By randomizing the algorithm, we ensure that no particular input elicits the worst case behavior, with that only happening for an unlucky permutation. We now stabilize the perforamnce of the algorithm and reduce its variability in hiring count. 

**Randomly Permuting Arrays**

Permute by sorting involves assigning each element with a random priority, and then the elements are sorted by their priorities. The sorting takes $\Omega({n\lg{n}})$ time. This obtains a uniform random permutation (every permutation has equal probability of appearing).

Proving that permutation by sorting obtains a uniform random permutation isn't as simple as showing that each element in the input array A[1…n] winds up in position $j$ with probability $1/n$ as that is not sufficient.

Randomization in place is better in that it takes $O(n)$ time. Without altering the input array, it makes $n$ swaps, swapping $A[i]$ with a random element from the subarray $A[i…n]$

Proving that this algorithm works by using the loop invariant that prior to the $ith$ iteration ($ith$ swap), the probability that the $(i-1)$ permutation of the $n$ elements is in the subarray $A[1…i-1]$ is $(n-i+1)!/n!$

For the maintaince part of the proof procedure, we assume that the $(i-1)$ permutation coming from $A[1…i-1]$ occurs with probability $(n-i+1)!/n!$. The probability that the $i$ permutation comes from only $A[1…i]$ is the event of the assumption occuring and the event that the algorithm places $A[i]$ into $A[i]$. 

The second event occurs with probability $1/(n-i+1)$ as there are $n-i+1$ elements left to choose to place into $A[i]$. So multiply the two events togehter and we have $(n-i)!/n!$ as the new probabilty and increment the iteration preserves the variant.

At termination, we reach $i=n+1$, implying the probability of the $n$ permutation occuring is $1/n!$



# II SORTING AND ORDER STATISTICS

![orderstats](assets/orderstats.png)

The $i$th order statistic of a set of $n$ numbers is the $i$th smallest number in the set

## 6 Heapsort

The **(binary) heap** data structure is an array object that can be viewed as a complete binary tree. Each node of the tree corresponds with an element in an array. Filled at all levels except possibly the lowest level.

$A.length$ gives number of elements in the array, $A.heap-size$ gives how many elements in the heap are stored. So $A$ may contain some extra numbers, but $A[1…A.heap-size]$ is the actual heap and its contents.

Root of the tree is always $A[1]$

Given index $i$, its parent node is $\lfloor i/2\rfloor$

Left node is $2i$, right node is $2i+1$

For efficiency, $2i$ can be calculated by shifting a bit to the left, and the right node can be done by shifting to the left and adding $1$ in the lower bit. Good implementations implement these as "macros" or "inline" procedures

**Max-heap and min-heap** are two kinds of binary heaps, each satisfying a **heap-property**

Max-heap: $A[Parent(i)] \geq A[i]$ for all $i \not=1$

Min-heap: $A[Parent(i)] \leq A[i]$ for all $i \not=1$

**height** of a node in a heap is max number of downward edges from the node to a leaf. Height of a heap is measured from the root.

Several procedures for a max-heap

Max-heapify: maintains heap

Build-max-heap: Builds a max-heap from an unsorted input array

Heapsort: sorts array in place

Max-heap-insert, Heap-extract-max, Heap-increase-key, Heap-maximum: help implement a priority queue.

### 6.2 Maintaining Heap Property

For a max heap, the max-heapify function works as follows

It takes the heap array $A$ and an index $i$, and fixes the element at $A[i]$, floats it down to its correct position

It's an recursive algorithm that checks amongst $A[i]$, and $A[left(i)],A[right(i)]$, which is the max value, and swaps $A[i]$ with the max value, and performs max-heapify at the position of where the max value was previously at.

A **min-heapify** function would take the same input, and fixes the element at $A[i]$ by floating it down to its correct position.

It's an recursive algorithm that checks instead for the smallest value, and swaps $A[i]$ with the smallest value, and performs min-heapify at the position where the smallest value was previously at.

### 6.3 Building a heap

Build-max-heap builds a max heap by going through half of the heap in a bottom up manner and applying max-heapify each time.

As $A[floor(n/2)+1…n]$ are all max-heaps by them selves are they are all leaves.

So from indices $floor(n/2)$ down to $1$, we run max-heapify on each index.

This produces a max-heap from an unordered array in linear time.

Building a min heap just replaces max-heapify with min-heapify, same occurs.

### 6.4 Heapsort algorithm

The heapsort algorithm takes an array of elements and sorts them in order.

We can sort by increasing order by first building a max heap, then iterating from A.length to 2, we exchange $A[i]$ with $A[1]$, reduce heap size, and run max-heapify on $A[1]$.

We essentially store the sorted part of the array at the end from $A[i+1…n]$, and by exchanging $A[1]$ with $A[i]$, $A[1]$ becomes some small element that needs to be heapified down to make $A[1…i-1]$ a max-heap.

### 6.5 Priority queues

A **priority queue** is a data structure for maintaining a set of $S$ elements, each with an associated value called a **key**.

A **max-priority-queue** supports the following:

$Insert(S,x)$, inserts $x$ into $S$, equivalent to $S=S \cup \{x\}$

$Maximum(S)$ returns the element of $S$ with the max key.

$Extract-max(S)$ removes and returns the element of $S$ with the max key.

$Increase-key(S,x,k)$, increases the value of element $x$'s key to a value $k$ larger than its current value.

A min-priority-queue supports Insert, minimum, extrac-min, and decrease-key. Could be used to simulate event-driven simulators, run an efficient A* search etc.

When using a heap to implement a priority queue, we need to store a **handle** to the corresponding application object in each heap element. The handle could be a pointer or an array index etc.

## 7 Quicksort

On average it is very efficient with a expected run time of $\Theta(n\lg{n})$, and small constant factors. As this is the expected time, no particular input elicits the worse case behavior.

### 7.1 Description of quicksort

Quicksort employs divide and conquer

![quicksortdac](assets/quicksortdac.png)

```pseudocode
Quicksort(A,p,r)
if p < r
	q = Partition(A,p,r)
	Quicksort(A,p,q-1)
	Quicksort(A,q+1,r)
```

```pseudocode
Partition(A,p,r)
x = A[r]
i = p - 1
for j = p to r - 1
	if A[j] <= x
		i = i + 1
		exchange A[i] with A[j]
exchange A[i+1] with A[r]
return i + 1
```

This partitions the subarray $A[p…r]$ by setting a pivot element $x=A[r]$ first, which ends up being the partitioning element $A[q]$ splitting $A$ into 3 parts, of which two are recursively sorted with quicksort.

We set a left pointer $i$, that holds the position of the element right before the split between $A[p…q-1]$ and $A[q+1…r]$. The right pointer $j$ slowly increments upward and is the right side of the right subarray

The loop invariant of the partition algorithm is as follows

1. If $p\le k \le i$, then $A[k] \le x$

2. If $i+1 \le k \le j - 1$, then $A[k] > x$

3. If $k=r$, then $A[k] = x$

   ![quicksortmaintain](assets/quicksortmaintain.png)

### 7.2 Performance of quicksort

Run time depends on how balanced each partition is.

Worst-case partitioning occurs when the sub problem is split into one of n-1 elements and one of 0 elements

$T(n) = T(n-1) + \Theta(n)$, which is equal to $O(n^2)$

Best-case partitioning occurs when theres an even split each time

$T(n) = 2T(n/2) + \Theta(n)=\Theta(n\lg{n})$ (master theorem!)

**Balanced partitioning** 

The average case run time of quicksort is closer to the best case than worst case.

Consider a partioning algorithm that always splits into 9 to 1 proportional split.

### 7.3 Randomized version of quicksort

Randomization allows us to avoid the worst case run time more often and ensure we achieve the expected running time. A simple change is needed to randomize quicksort without permuting the inputs at all

Instead of setting the pivot to be the original rightmost element, we set the pivot to be a random element by exchanging the rightmost element with a random one in the subarray. This is a **random sampling** technique. This allows us to expect the split to be reasonably balanced on average.

### 7.4 Analysis of quicksort

#### 7.4.1 Worst-case analysis (TODO)



## 8 Sorting in Linear Time

### 8.1 Lower bounds for sorting (TODO)

It can be proven that any comparison sort (using only comparisons to sort something) is asymptotically bounded by $\Omega({n \lg{n}})$



### 8.2 Counting Sort

Counting assumes that each of the $n$ elements to be sorted are an integer between $0$ to $k$. (If it was for letters, we can attatch a number to each letter, its numerical representation in code)

Counting sort determines for each input element $x$, the number of elements less than $x$, and uses this information to place $x$ in its correct position in a new output array.

Counting sort first creates an array $C[0…k]$, and makes a linear run through the input array $A[1…n]$ and counts the number of occurences of $0≤i≤k$ and stores it into $C$ where $C[i] =$ the number of occurences of $i$. Then, counting sort loops through $C$ and stores the cumulative occurrences, so $C[i]=C[i-1]$.

Now, from $j=n$ to $j=1$, we store $B[C[A[j]]] = A[j]$

This works as $C[A[j]]$ is the number of elements less than $A[j]$, so storing $A[j]$ into $B[C[A[j]]]$ is correct as it should be larger than all elements $B[1…C[A[j]] - 1]$

Counting sort is **stable**: numbers with the same value appear in the output array in the same order as they do in the input array

Time and space use are $\Theta(n + k)$, as we make $\Theta(n)$ linear runs through array $A$ and $\Theta(k)$ linear runs through $C$. Space is $n+k$ as we create $B$ and $C$, sizes $n$ and $k$ (its not in-place sorting).

This stability is important if we want to order satellite data (other attributes of an element), but is also important for radix sort for which counting sort is a subroutine.

PERSONAL NOTE:

If we are sorting only integers and don't need stability, we can do this with $\Theta(k)$ space and $\Theta(n)$ time

We go up to the step where we create array $C[0…k]$ and count the occurences of $i$ where $C[i]$ equals the number of occurences of $i$. Then we 'sort' $A$ in place by iterating $j$ from $1$ to $n$, and keeping another pointer $p$ for array $C$. If $C[p] > 0$, we store $A[j] = p$ and increment $j$. While $C[p] = 0$, we increment $p$ without incrementing $j$ yet. We terminate if $p > k$ or $j > n$.

This is not really sorting? But uses the fact that two elements $x_i, x_j$ are equal if they are just an integer. (we exclude satellite data).

Clearly it is $\Theta(k)$ space, and we make two loops through $A$, one to count occurences and another to insert numbers in to make $A$ sorted. This method noted cannont be used for radix sorting. 

However, we could make $C$ an array of linked lists. $C[i],C[i].next, C[i].next.next…$ are the elements in the correct order they were in originaly in $A$, all having the same value of $i$. This would allow us to carry satellite data. When sorting $A$, we end up replacing its elements with a copy of itself stored in $C$. After replacing, we put $C[i].next$ as the head of the linked list.

### 8.3 Radix Sort

Radix sort sorts by radix = digit. It sorts by the least significant digit first, and then moves upwards. It sorts $n$ numbers by digit $i$ from the right with a counting sort, which is possible as the digits range from $0$ to $9$ usually (or a certain bit). The stability of counting sort ensures the correct order of sorting for radix sorting.

![radixsort](assets/radixsort.png)

Think of it like sorting dates. We would first sort by year, if there's a tie then sort the ties by month, and if there's a tie sort by day. 

With radix sort, we do 3 counting sorts that are stable.

First we sort by day, and then by month. Due to stability, dates with the same month will automatically be sorted correctly by day as well. Then we sort by year and by the same argument, its all sorted!

Given $n$ $b$-bit numbers, $r≤b$, radix-sort using counting sort takes $\Theta((b/r)(n+2^r))$ time.

Counting sort runs in $\Theta(n+2^r-1)$ time as we can choose an $r$ such that each digit of the $d = b/r$ digits ranges from $0$ to $2^r-1$. (We have $d$ $r$ bits basically, which later combine to the original $b$ bit. Think of a 32-bit word split into 4 8-bit chunks)

$d=b/r$, so total of $b/r$ uses of counting sort, so $\Theta((b/r)(n+2^r))$

If $b < \lfloor\lg{n}\rfloor$, then any $r ≤ b$ achieves $\Theta(n)$

If $b ≥  \lfloor\lg{n}\rfloor$, then $r= \lfloor\lg{n}\rfloor$ achieves the best running time of $\Theta(bn/lg{n})$ to within a constant factor.

### 8.4 Bucket Sort

Bucket sort assumes the input is drawn from a uniform distribution and has a average-case running time of $O(n)$

The basic form of bucket sort takes an $n$ element input array $A$ such that $0≤A[i]<1$, and requires an auxiliary array $B[0…n-1]$ of linked lists (buckets).

![image-20190506153940713](assets/image-20190506153940713.png)

Every line takes at most $\Theta(n)$ time (concatenating takes $O(n)$ as well because they are linked lists, at most $n$ lists to combine)

Line 8 takes $O(n(2-1/n))$ time, which can be proven by analyzing $E[n_i^2]$, where $n_i$ is the random variable of the number of elements in $B[i]$. We analyze $E[n_i^2]$ as insertion sort takes $O(n^2)$ worst time and we wish to find the average case run time. We can compute it by also introducing a random variable $X_{ij} = I\{A[j] \text{ falls in bucket } i\}$

and seeing that the sum of all the $X_{ij}$ for fixed $i$ gives $n_i$

## 9 Medians and Order Statistics

The $i$th order statistic of a set of $n$ elements is the $i$ smallest element. The minimum is the first order statistic and the maximum is the $n$th order statistic. 

The lower median is $i=\lfloor{(n+1)/2}\rfloor$ and the upper median is $i=\lceil{(n+1)/2}\rceil$

(The Median in these notes refers to the lower median)

The problem of finding the $i$th order statistic can easily be done in $O(n\lg{n})$ time by sorting and then finding the $i$th index in the array.

### 9.1 Minimum and Maximum

The optimal method to find the minimum or maximum is by making $n-1$ comparisons. Suppose we have a tournament of the elements. Each match is a comparison of the elements to determine which is smaller. As every element except the winner must lose a match, we conclude that $n-1$ comparisons are necessary to determine the minimum.

Sometimes we need to the find the simultaneous minimum and maximum of a set of $n$ elements, e.g when we want to scale a display on a graph when displaying the $n$ elements, we need to find the range of $x$ and $y$ values. Indepdently finding the min and max can take $2n-2$ comparisons. We can do faster

For a set of $n$ elements, we look at each pair and we compare the smaller of the pair with the minimum and the larger of the pair with the maximum for a total of 3 comparisons per pair and a total of $3 \lfloor{n/2}\rfloor$ comparisons.

### 9.2 Selection in Expected Linear Time

A randomized selection algorithm based off of quicksort can solve this.

Using the randomized-partition algorithm from quick sort, which takes a random pivot A[q] from A[p…r] and partitions the subarray A[p…r] into two parts such that A[p…q-1] is ≤ A[q] and A[q] ≤ A[q+1…r]

When looking for the $i$th order statistic, if the number of elements in the lower array with $A[q]$, which is $A[p…q]$, having $k=q-p + 1$ elements, is equal to $i$, then $A[q]$ is the $i$th order statistic as it is larger than $i-1=k-1$ elements and smaller than the rest. If $i < k$, that means the value we are lookign for lies in the lower array and we recursively solve for that by looking for the $i$th order statistic in $A[p…q-1]$. Otherwise, it lies in the larger array, and we now look for the $i-k$ th order statistic of $A[q+1…r]$, which would be the $i$th order statistic of $A[p…r]$



### 9.3 Selection in Worst Case Linear Time

Like randomized selection, we find the desired element by recursively partioning the array. However, we gurantee a good split through partioning to avoid edge cases that cause $O(n^2)$ run time for randomized selection (if we kept partioning around the largest element as an example and we wanted to find the minimum).

Selection Algorithm:

1. Divide the n elements of the input array into $\lfloor n/5\rfloor$ groups of 5 elements each

   and at most one group made up of the remaining $n$ mod $5$ elements.

2. Find the median of each of the $\lceil n/5 \rceil$ groups through insertion sorting them and picking the middle element (or lower median for the extra group if needed)

3. Use the selection algorithm recursively to find the median $x$ of the medians found in step 2 (lower median chosen if needed)

4. Partition the input array around $x$ similar to the one in quicksort, partioning it such that the lower array $A[p…q-1]$ ≤ $x$ ≤$A[q+1…r]$ ($A[q] = x$). Letting $k$ be one more than the number of elements in the lower array, then $x$ is the $k$th order statistic and 

5. if $k=i$, our desired order statistic, we are done. Otherwise if $i < k$, we recursively find the $i$th order statistic in the lower array or the $i-k$th smallest element in the upper array if $i > k$.

#### 9.3.1 ANALYZING SELECTION IN WORST CASE O(N) TIME

When we find $x$, the median of the medians, we immedietely know that $x$ is smaller than half of the $\lceil n/5 \rceil$ medians found, and each group the medians came frame, have at least 3 elements larger than $x$ as their median is larger than $x$, and two more values in the groups of 5 are larger than the median. The only exceptions to groups that contribute at least 3 elements larger than $x$ are the remainder edge group that doesn't have 5 elements in the group $x$ is in itself.

So we can place a lower bound on the number of elements that are larger than $x$, ignoring the 2 exception groups, it is
$$
3(\lceil{\frac{1}{2}\lceil{n/5}\rceil}\rceil-2) \ge 3n/10 - 6
$$
(It's kind of a weak bound for smaller $n$ like $n=28$, but for larger values, it doesn't matter and this algorithm is likely better for finding the order statistics in large arrays due to some constant factors)

Similarly, we can conclude that at least $3n/10 - 6$ elements are smaller than $x$.

This implies that our partition is always at least $3n/10 -6$ and $7n/10 + 6$, or better (better being its a much more balanced partition, more even split, which allows us to select faster as we eliminate more possibilities on average).

Step 1, 2, 4 take $O(n)$ time

Step 2 takes $O(n)$ calls to insertion sort running in $O(5) = O(1)$ time.

Step 3 takes $T(\lceil n/5 \rceil)$ time.

Step 5 takes at most $T(7n/10 + 6)$ time in the worst case as our order statistic might be in the array that has more elements.

There's also a magic constant $140$, where if $n < 140$, the algorithm is $O(1)$, otherwise

$$T(n) = T(\lceil n/5 \rceil)  + T(7n/10 + 6) + O(n) \quad n ≥ 140$$

By substitution, we can show its linear time.

$T(n) \le cn/5 + c + 7cn/10 + 6c + an$

$T(n) \le cn + (-cn/10 + 7c + an) \le cn$

Which is valid provided $-cn/10 + 7c +an \le 0$, which implies $c\ge 10a(n/(n-70))$ when $n > 70$

We assumed $n \ge 140$, so $n/(n-70) \le 2$, so $c\ge 20 a$ is sufficient. Ok wow, in fact 140 isnt special at all, we could have chosen any value above 70 and then choose $c$ accordingly...

