# Google Machine Learning Crash Course notes

Some latex preambles that you can't see

$\text{Defined vector: \v{x} becomes } \v{x} \newcommand{\v}[1]{\boldsymbol{#1}}$



## Framing

Supervised Machine Learning

ML systems learn how to combine input to produce useful predictions on never-before-seen data

- **Label**: Variable we're predicting, $\v{y}$
- **Features**: input variables that describe our data, $\v{x} = [x_1,x_2,…,x_n]$



- **Example**: A particular instance of data $x$
- **Labeled example**: {features, label}: $(\v{x},\v{y})$
- **Unlabeled example**:, {features, ?}: $(\v{x},?)$
  - Used for making predictions on new data
- **Model** maps examples to predicted labels $\boldsymbol{y'}$
  - Defined by internal parameters, which are learned
  - It does the predicting and is created through **learning** from data (**training** the model)
- **Inference** means applying the trained model to unlabeled examples. That is, you use the trained model to make useful predictions

Two main kinds of models:

**Regression** model predicts continuous values. For example, these models can try to predict the value of a house in Beijing, the depth of a part of an image, 

**Classification** model predicts descrete values. Classification models make predictions that answer questions such as 

- Is a email spam or not spam
- Is the person young or old
- What object is in the image?

## Descending into ML

In the problem of linear regression, we know that a linear relationship follows $y'=w_1x_1+b$, where $w_1$ is the weight vector, and $b$ is the bias, $x_1$ is one feature variable.

A good line can be determined by looking at the loss. **Loss** is just a number indicating how bad the model's prediction was on a single example. 



$L_2$ Loss is also known as squared error

It equals the square of the difference between prediction and label. $(\v{v'}-\v{v})^2$

The loss is then the sum of these squared differences, and sometimes to average over all samples we divide by the number of samples

To train a model, we simply learn/determine the best values for all the weights and the bias from labeled examples. Supervised ML attempts to find a model that minimizes loss, known as **empirical risk minimization**.

**Mean square error** (MSE), is the average squared loss.

## Reducing Loss

How do we choose the parameters and weight vectors to reduce loss?

WE need a way to find a direction such that the new hyperparameters lead to less loss

- **Hyperparameters** are the configuration settings used to tune how the model is trained. Such as learning rate
- The derivative of $(\v{y}-\v{y'})^2$ with respect to the weights and biases tells us how loss changes for a given example
  - Simpel to compute and convex
- We repeatedly take small steps in the direction that minimizes loss
  - Each step is a gradient step
  - Strategy is known as gradient descent

We take in feature data, calculate the loss and the gradient of the loss function, the negative of the gradient tells us the direction to update the model parameters in in order to reduce loss. Repeat.

- **Learning rate**: Dictates how large of a step to take in the direction of a negative gradient. A small rate will require a lot more steps and more computation wheras a larger rate will reach and possibly go past the local minimum of the loss easily.
  - In more dimensions, if we reach a loss larger than before, this will cause the model to diverge. As if the loss increases, we will take a even larger step to go back to lower loss but due to the large learning rate, will overshoot in the other direction and diverge further
  

**Weight initialization:**

For convex problems, the loss function follows a parabolic shape, a U shape, so regardless of starting point, as long as the learning rate is appropriately chosen, we will reach the single minimum it has.

However, we can't do the same of neural nets, as they are non-convex. (Think of a 8th degree polynomial with a bunch of turning points). It has more than one local minimum, and to find the global maximum, it will strongly depend on initial values.

**SGD & Mini-Batch Gradient Descent:**

We could compute gradient over entire data set at each step to get the exact gradient, but this is computationally expensive.

Computing gradient on small data samples works well

We can use **stochastic gradient descent**, which is using one example at a time. Although each step is smaller, the total amount of computation is often much smaller.

We can also use **mini-batch gradient descent**: Loss and gradients averaged over the batch (size of 10-1000). An intermediete solution.

The gradient of loss is the derivative of the loss curve at that point. Or partial derivative with respect to the multiple weights. We take the direction of the negative gradient in order to reduce loss as quickly as possible. (Negative gradient of each partial derivative)

For each problem, there's a perfect learning rate. Its related to how flat the loss function is (or locally flat around the starting point?). If the loss function gradient is usually small, you can safely take larger steps (larger change in weight vector)



