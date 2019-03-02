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

$c_1n^3\leq 3n^3 + 3n - 3\leq c_2n^3 \implies c_1\leq 3 + \frac{3}{n^2} - \frac{3}{n^3} \leq c_2$. As $c_1,c_2$ are constant and tightly bound a function above and below, we have that $3n^3 + 3n - 3 = O(n^3)$ is tight.![relativegrowthrates](/Users/stone.tao/Desktop/Coding/Practice/JS/introtoalgorithms/assets/relativegrowthrates.png)

The statement $f(n) = O(g(n))$ merely claims that some constant multiple of $g(n)$ is an upper bound for $f(n)​$, with no claims as to how tight the bound is.

Saying that the running time of $f(n)$ is $O(n^2)$ usually means the worst case running time is $O(n^2)$ as that statement applies for any input of size $n​$.

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



