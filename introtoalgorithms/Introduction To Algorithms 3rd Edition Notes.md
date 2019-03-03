## 0 Basic Maths I should probably know

"$:$" means such that

#### Sets

$A\subseteq B$ means that A is a subset of B, all elements of A are in B (or $x \in A \implies x\in B$)

$A\subset B$ means that all elements of A are in B but $A \not= B$

## 3 Growth of Functions

$\Theta(g(n))​$ denotes the set of functions = $\{f(n):\exists c_1,c_2,n_0 > 0 \text{ such that } 0 \leq c_1g(n)\leq f(n) \leq c_2g(n) \text{ for all } n\geq n_0\}​$

Essentially saying that $f(n)$ is equal to $g(n)$ within a constant factor, and so $g(n)$ is an **asymptotically tight bound** for $f(n)$. $f(n)$ must also be **asymptotically non-negative** ($f(n) \geq 0$ for sufficiently large $n$)



$O(g(n))=​$$\{f(n):\exists c,n_0 > 0 \text{ such that } 0 \leq f(n) \leq cg(n) \text{ for all } n\geq n_0\}​$. **An asymptotic upper bound**

$\Omega(g(n))=​$$\{f(n):\exists c,n_0 > 0 \text{ such that } 0 \leq cg(n) \leq  f(n) \text{ for all } n\geq n_0\}​$. **An asymptotic lower bound**

Example of asymptotically tightness: $3n^3 + 3n-3 = O(n^3)​$ is tight if $3n^3+3n-3 = \Theta(n^3)​$ as well, true due to the following

$c_1n^3\leq 3n^3 + 3n - 3\leq c_2n^3 \implies c_1\leq 3 + \frac{3}{n^2} - \frac{3}{n^3} \leq c_2$. As $c_1,c_2$ are constant and tightly bound a function above and below, we have that $3n^3 + 3n - 3 = O(n^3)$ is tight.

![relativegrowthrates](/Users/stone.tao/Desktop/Coding/Practice/introtoalgorithms/assets/relativegrowthrates.png)

The statement $f(n) = O(g(n))$ merely claims that some constant multiple of $g(n)$ is an upper bound for $f(n)$, with no claims as to how tight the bound is.

Saying that the running time of $f(n)$ is $O(n^2)$ usually means the worst case running time is $O(n^2)$ as that statement applies for any input of size $n$.

Saying that the running time of $f(n)$ is $\Omega(n^2)$ usually means the best case running time is $\Omega(n^2)$ as that statement applies for any input of size $n$.

Note that due to the nature of the set definitions, clearly $\Theta(g(n)) \subseteq O(g(n)), \Omega(g(n))$

**Theorem 3.1**

For any two functions $f(n), g(n)$, we have that $f(n) = \Theta(g(n))$ if and only if $f(n) = O(g(n))$ and $f(n) = \Omega(g(n))$

Proof:

We first prove the forwards direction,

If $f(n)=\Theta(g(n))​$, then $0 \leq c_1g(n) \leq f(n) \leq c_2g(n)​$ for all $n\geq n_0​$ for constants $c_1,c_2,n_0​$.

As  $0 \leq f(n) \leq c_2g(n)$, by definition we have $f(n) = O(g(n))$

$0 \leq c_1g(n) \leq f(n)$, by definition we have $f(n) = \Omega(g(n))$

Backwards direction

If $f(n) = O(g(n))$ and $f(n) = \Omega(g(n))$, we have that $0 \leq f(n) \leq c_2g(n)$ for $n \geq n_2$, $0 \leq c_1g(n) \leq f(n)$ for $n \geq n_1​$

Let $n_0 = max(n_1,n_2)$

Then clearly $0 \leq c_1g(n) \leq f(n) \leq c_2g(n)$ for all $n\geq n_0$, showing that $f(n) = \Theta(g(n))$

**Example of using these terms correctly!**

Consider Insertion sort

The running time of insertion sort is $\Omega(n)$ and is also $O(n^2)$, which is correct as insertion sort's running time falls between a linear to quadratic function of $n$. These bounds are also asymptotically tight. Saying the running time is $\Omega(n^2)$ is incorrect as there exists an input of $n$ (array of $n$ sorted elements), of which insertion sort runs in $\Theta(n)$ time. It is correct to say that the worst-case running time of insertion sort is $\Omega(n^2)$ as there exists an input that causes the algorithm to take $\Omega(n^2)$ time.

$4n^2+3n-2 = 4n^2 + \Theta(n)$ is correct and the $\Theta(n)$ represents a function $f(n) \in \Theta(n)$, one of which could be $f(n) = 3n-2$

Asymptotic notation can also appear on the left side of an equation e.g

$4n^2 + \Theta(n) = \Theta(n^2)$, which is fine as there is  always a way to choose an anonymous function on the right side to make it valid. The right side provides a coarser level of detail than the left (is more loose)

Not all bounds provided by $O$-notation is asymptotically tight, so this is where $o$-notation comes in handy.

E.g, we have that $3n^2 = O(n^2)​$ is asymptotically tight as they are within a constant factor of each other

$o(g(n))= $ $\{f(n):\text{ for every } c>0, \exists n_0 > 0 \text{ such that } 0 \leq f(n) < cg(n)\text{ for all } n\geq n_0\}$. **An asymptotic upper bound that is not tight**. e.g $n^2 = o(n^3), n^2 \not= o(n^2)$. Difference with $O$ is that this holds for all $c$.

Intuitively, $f(n)​$ becomes insignificant: $\lim_{n \rightarrow \infty} \frac{f(n)}{g(n)}= 0 ​$, another definition of o-notation

$\omega(g(n))= $$\{f(n):\text{ for every } c>0, \exists n_0 > 0 \text{ such that } 0 \leq cg(n) < f(n) \text{ for all } n\geq n_0\}$. **An asymptotic lower bound that is not tight**.

$\omega$ is to $\Omega$ is analogous to $o$ is to $O$. Another definition is that $f(n) \in \omega(g(n))$ if and only if $g(n) \in o(f(n))$

$\lim_{n \rightarrow \infty} \frac{f(n)}{g(n)}= \infty$, another definition of $\omega$-notation

**Nice Corollary?**

If $A$ is $o(B)$, then $A$ is also $O(B)$

If $A$ is $\omega(B)$, then $A$ is also $\Omega(B)$

Simple proof:

Given $f(n) = o(g(n))$, then $0 \leq f(n) < cg(n)$ for every $c$ and for all $n \geq n_0=$ a constant.

Then choose a $c_1 =$  a particular $c$ and $n_0$

Then clearly $0 ≤ f(n) < c_1g(n)​$ for $n≥n_0​$, implying $0 \leq f(n) \leq c_1g(n)​$ for the same $n​$, so $f(n) = O(g(n))​$. $\leq​$ is more loose than $<​$ so this is allowed.

#### Comparing Functions

**Transitivity:**

$f(n) = X(g(n))​$ and $g(n) = X(h(n))​$ $\implies​$ $f(n) = X(h(n))​$, where $X \in \{\Theta, O, \Omega, o, \omega \}​$

Proof: $f(n) = X(g(n)) \implies 0 \leq c_1g(n) \leq f(n) \leq c_2g(n)$

$g(n) = X(h(n)) \implies 0 \leq t_1h(n) \leq g(n) \leq t_2h(n) \implies 0 \leq c_1t_1h(n) \leq c_1g(n), \space c_2g(n) \leq c_2t_2h(n)​$

Then $0 \leq c_1t_1h(n) \leq f(n) \leq c_2t_2h(n)$, and as $c_1t_1, c_2t_2$ are constants, this implies $f(n) = X(h(n))$

**Reflexivity:**

$f(n) = X(g(n))$ and $g(n) = X(h(n))$ $\implies$ $f(n) = X(h(n))$, where $X \in \{\Theta, O, \Omega \}$

**Symmetry:**

$f(n) = \Theta(g(n))​$ if and only if $g(n) = \Theta(f(n))​$

**Transpose Symmetry:**

$f(n) = O(g(n))​$ if and only if $g(n) = \Omega(f(n))​$

$f(n) = o(g(n))$ if and only if $g(n) = \omega(f(n))$

Due to the above, an analogy can be drawn between comparing asymptotic functions and comparing two real numbers $a,b$

$f(n) = \Theta(g(n))$ is like $a = b$

$f(n) = O(g(n))$ is like $a \leq b$

$f(n) = \Theta(g(n))$ is like $a \geq b$

$f(n) = o(g(n))​$ is like $ a < b​$

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

$n! = \sqrt{2\pi n} (\frac{n}{e})^n (1 + \Theta(\frac{1}{n}))​$ **Stirling's Approximation**

$n! = \sqrt{2\pi n}(\frac{n}{e})^n e^{\alpha_n}$ Where $\frac{1}{12n+1} < \alpha_n < \frac{1}{12n}$

**Functional iteration**

$f^{(i)}(n)​$ denotes the function $f(n)​$ iteratively applied $i​$ times to an initial value of $n​$. Can be recursively defined as $f^{(i)}(n)​$ = $f(f^{(i-1)}(n)))​$ if $i>0​$, 

**The iterated logarithm function**

$\lg^*n$ (log star of $n$) denotes the iterated logarithm function

$\lg^*n = \min\{ i \geq 0 : \lg^{(i)}n \leq 1\}$; So $\lg^*2 = 1, \lg^*16 = 3​$ (lg(lg(lg(16))) = 1)



## 4 Divide-And-Conquer

We divide and conquer a problem by performing the 3 steps at each of level of recursion

**Divide** the problem into a number of subproblems that are smaller instances of the same problem.

**Conquer** the subproblems by solving them recursively. If the subproblem sizes are small enough, however, just solve the subproblems in a straightforward manner.

**Combine** the solutions to the subproblems into the solution for the original problem.

When subproblems are large enough to solve recursively, it is called **recursive case**

When subproblems are small enough such that we don't recurse, the recursion **bottoms out** and we have gotten down to the **base case**.

Merge-sort is a classic example of using divid-and-conquer and its worst case running time $T(n)$ is 
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

Sometimes you can divide into a even sized sub problems or an integral sized sub problem, such as an odd input and using merge-sort. Additionally, boundary conditions, such as the solution to the recurrence for say $n<2$ that differ from the general solution are typically ignored.

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

![Screen Shot 2019-03-02 at 5.04.02 PM](/Users/stone.tao/Desktop/Coding/Practice/introtoalgorithms/assets/Screen Shot 2019-03-02 at 5.04.02 PM.png)

It can be approached by finding the maximum subarray of $A[i…mid]​$ and $A[mid+1…j]​$ and combining the two, combining if they are larger than 0. As they must include element $A[mid]​$ and $A[mid+1]​$, we can solve this in $\Theta(n)​$ time.

So a recursive solution can be done by finding the maximum subarray of $A[low…mid]$ and $A[mid+1…high]$ where $mid = floor((low+high)/2)$, and the maximum subarray of the arrays that cross the midpoint. Which ever of those maximum subarrays have the highest sum is then returned at each recursive step.

We can compute the worst case run time $T(n)$ as follows

At each recursive step, we compute the max subarray of $A[low..mid], \ A[mid+1…high]$, so that takes $2T(n/2)$ time. We also compute the maximum crossing subarray, which takes $\Theta(n)$ time. There are probably some other constant time factors, so we also add a $\Theta(1)$ (Such as checking which of the maximum subarrays has the higher array sum)

Thus, $T(n) = 2T(n/2)  + \Theta(n) + \Theta(1) = 2T(n/2)  + \Theta(n) $
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

In fact, this can be sped up by using divide and conquer.

#### Simple divide and conquer solution

For now, assume $n$ is a power of 2. For computing $C = A \cdot B$, consider a 4-way partition of them

