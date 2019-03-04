/* 
 * Implementation of Strassen's Algorithm 
 * --- NOTES ---
 * A[y1...y2][x1...x2] means we take a slice of matrix A 
 * with elements A[y1][x1] to A[y2][x2], forming a rectangular slice.
 * We use index calculations to avoid spending time copying matrices to speed up run time
 *
 * 
 */

/*
 * Strassen Algorithm that multiplies two matrices A and B using divide and conquer
 * It has a threshold of n = 64, at which the algorithm switches over to a classical matrix multiplication algorithm.
 */
function strassenMatrixMultiply(A,B) {
  let n = A.length;
  let n2 = Math.pow(2,Math.ceil(Math.log2(n)));
  if (n2 !== n) {
    let filler = new Array(n2-n);
    let filler2 = new Array(n2);
    filler.fill(0);
    filler2.fill(0);
    for (let i = 0; i < n; i++) {
      A[i] = A.concat(filler);
      B[i] = B.concat(filler);    
    }
    for (let i = n; i < n2; i++) {
      A.push(filler2);
      B.push(filler2);
    }
  }
  
  let result = multiplyMatrix2Recursive(A,B,0,0,0,0,n2);
  for (let i = 0; i < result.length; i++) {
    result[i].splice(n,n2);
  }
  result.splice(n,n2);
  return result;
}

/*
 * Creates a square matrix size n x n
 * @param {number} n - Row and length of created matrix
 */
function createSquareMatrix(n) {
  let A = new Array(n);
  for (let i = 0; i < A.length; i++) {
    A[i] = new Array(n);
  }
  return A;
}

/*
 * Naively multiplies slices of matrices A and B
 */
function multiplyMatrixHelper(A,B,ai,aj,bi,bj,n) {
  let C = createSquareMatrix(n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += A[ai+i][aj+k] * B[bi+k][bj+j];
      }
      C[i][j] = sum;
    }
  }
  return C;
}

/*
 * Recursively multiply matrices slices A1 = A[ai...ai+n][aj...aj+n] with B1 = B[bi...bi+n][bj...bj+n] 
 * 
 * @param {matrix} A - First input matrix
 * @param {matrix} B - Second input matrix
 * @param {number} n - Size of A1 and B1
 */
function multiplyMatrix2Recursive(A,B,ai,aj,bi,bj,n) {
  //multiplies square slice of matrix A containing A_ai,aj up to A_ai+n,aj+n
  let C = createSquareMatrix(n);
  if (n <= 64) {
    //Threshold for falling back to classic algorithm 
    C = multiplyMatrixHelper(A,B,ai,aj,bi,bj,n);
  }
  else {
    //STEP 1, partition the slices of A and B into 4 parts each
    //We can do it as so
    //A11 = A[ai...ai + n/2 - 1][aj...aj + n/2 - 1]
    //A12 = A[ai...ai + n/2 - 1][aj + n/2...aj + n - 1]
    //A21 = A[ai + n/2...ai + n - 1][aj...aj + n/2 - 1]
    //A22 = A[ai + n/2...ai + n - 1, aj + n/2...aj + n - 1]

    //B11 = B[bi...bi + n/2 - 1][bj...bj + n/2 - 1]
    //B12 = B[bi...bi + n/2 - 1][bj + n/2...bj + n - 1]
    //B21 = B[bi + n/2...bi + n - 1][bj...bj + n/2 - 1]
    //B22 = B[bi + n/2...bi + n - 1, bj + n/2...bj + n - 1]
    
    //STEP 2; We compute matrices S1,S2,...,S10 accordingly
    let S1 = subtractMatrix(B,B,bi,bj+n/2,bi+n/2,bj+n/2,n/2); //B12 - B22
    let S2 = addMatrix(A,A,ai,aj,ai,aj+n/2,n/2); //A11 + A12
    let S3 = addMatrix(A,A,ai+n/2,aj,ai+n/2,aj+n/2,n/2); //A21 + A22
    let S4 = subtractMatrix(B,B,bi+n/2,bj,bi,bj,n/2); //B21-B11
    let S5 = addMatrix(A,A,ai,aj,ai+n/2,aj+n/2,n/2); //A11+A22
    let S6 = addMatrix(B,B,bi,bj,bi+n/2,bj+n/2,n/2); //B11+B22
    let S7 = subtractMatrix(A,A,ai,aj+n/2,ai+n/2,aj+n/2,n/2); //A12-A22
    let S8 = addMatrix(B,B,bi+n/2,bj,bi+n/2,bj+n/2,n/2); //B21+B22
    let S9 = subtractMatrix(A,A,ai,aj,ai+n/2,aj,n/2); //A11-A21
    let S10 = addMatrix(B,B,bi,bj,bi,bj+n/2,n/2); //B11+B12
    
    //STEP 3; We recursivly multiply matrices to obtain P1,P2,...P7
    let P1 = multiplyMatrix2Recursive(A,S1,ai,aj,0,0,n/2); //A11*S1
    let P2 = multiplyMatrix2Recursive(S2,B,0,0,bi+n/2,bj+n/2,n/2); //S2*B22
    let P3 = multiplyMatrix2Recursive(S3,B,0,0,bi,bj,n/2); //S3*B11
    let P4 = multiplyMatrix2Recursive(A,S4,ai+n/2,aj+n/2,0,0,n/2); //A22*S4
    let P5 = multiplyMatrix2Recursive(S5,S6,0,0,0,0,n/2); //S5*S6
    let P6 = multiplyMatrix2Recursive(S7,S8,0,0,0,0,n/2); //S7*S8
    let P7 = multiplyMatrix2Recursive(S9,S10,0,0,0,0,n/2); //S9*S10
    
    //STEP 4; We combine the multiplied matrices into the output matrix C.
    for (let i = 0; i < n/2; i++) {
      for (let j = 0; j < n/2; j++) {
        C[i][j] = P5[i][j] + P4[i][j] - P2[i][j] + P6[i][j];
      }
    }
    for (let i = 0; i < n/2; i++) {
      for (let j = n/2; j < n; j++) {
        C[i][j] = P1[i][j-n/2] + P2[i][j-n/2];
      }
    }
    for (let i = n/2; i < n; i++) {
      for (let j = 0; j < n/2; j++) {
        C[i][j] = P3[i-n/2][j] + P4[i-n/2][j];
      }
    }
    for (let i = n/2; i < n; i++) {
      for (let j = n/2; j < n; j++) {
        C[i][j] = P5[i-n/2][j-n/2] + P1[i-n/2][j-n/2] - P3[i-n/2][j-n/2] - P7[i-n/2][j-n/2];
      }
    }
    
  }
  return C;
}

/*
 * Adds slices of matrices A and B
 */
function addMatrix(A,B,ai,aj,bi,bj,n) {
  let C = createSquareMatrix(n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      C[i][j] = A[ai+i][aj+j] + B[bi+i][bj+j];
    }
  }
  return C;
}
/*
 * Subtracts slices of matrices A and B
 */
function subtractMatrix(A,B,ai,aj,bi,bj,n) {
  
  let C = createSquareMatrix(n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      C[i][j] = A[ai+i][aj+j] - B[bi+i][bj+j];
    }
  }
  return C;
}
module.exports = {
  strassenMatrixMultiply,
}