function createSquareMatrix(n) {
  let A = new Array(n);
  for (let i = 0; i < A.length; i++) {
    A[i] = new Array(n);
  }
  return A;
}

//Naive implementation - O(n^3)
function multiplyMatrix(A,B) {
  let n = A.length;
  let C = createSquareMatrix(n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      //Compute C[i][j];
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += A[i][k] * B[k][j];
      }
      C[i][j] = sum;
    }
  }
  return C;
}
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

//Strassen's Algorithm, my experimental version
function multiplyMatrix2(A,B) {
  let n = A.length;
  let n2 = Math.pow(2,Math.ceil(Math.log2(n)));
  if (n2 !== n) {
    let filler = new Array(n2-n);
    let filler2 = new Array(n2);
    filler2.fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n2-n; j++) {
        A[i].push(0);
        B[i].push(0);
      }
      
    }
    for (let i = n; i < n2; i++) {
      A.push(filler2);
      B.push(filler2);
    }
  }
  //pass the row of the first padded 0 row and column of the first padded 0 column
  //which are n+1,n+1
  
  let result = multiplyMatrix2Recursive(A,B,0,0,0,0,n2,n+1,[true,true]);
  for (let i = 0; i < result.length; i++) {
    result[i].splice(n,n2);
  }
  result.splice(n,n2);
  return result;
}
var matrixMultiplcationCount = 0;
//assumes matrix is of correct size.
function multiplyMatrix2Recursive(A,B,ai,aj,bi,bj,n,n0,imb) {
  //imb = inputMatrixBool
  //multiplies square slice of matrix A containing A_ai,aj up to A_ai+n,aj+n
  let C = createSquareMatrix(n);
  if (n <= 64) {
    //Threshold for falling back to classic algorithm 
    C = multiplyMatrixHelper(A,B,ai,aj,bi,bj,n);
  }
  else {
    //first partition
    //A11 = A[ai...ai+n/2 - 1][aj...aj+n/2 - 1], A12 = A[ai...ai+n/2 - 1][aj+n/2...aj+n-1]
    //A21 = A[ai + n/2...ai + n - 1][aj...aj+n/2 - 1], A22 = A[ai+n/2...ai+n-1, aj+n/2...aj+n-1]
    
    //STEP 2
    let S1 = subtractMatrix(B,B,bi,bj+n/2,bi+n/2,bj+n/2,n/2,n0,[imb[1],imb[1]]); //B12 - B22
    let S2 = addMatrix(A,A,ai,aj,ai,aj+n/2,n/2,n0,[imb[0],imb[0]]); //A11 + A12
    let S3 = addMatrix(A,A,ai+n/2,aj,ai+n/2,aj+n/2,n/2,n0,[imb[0],imb[0]]); //A21 + A22
    let S4 = subtractMatrix(B,B,bi+n/2,bj,bi,bj,n/2,n0,[imb[1],imb[1]]); //B21-B11
    let S5 = addMatrix(A,A,ai,aj,ai+n/2,aj+n/2,n/2,n0,[imb[0],imb[0]]); //A11+A22
    let S6 = addMatrix(B,B,bi,bj,bi+n/2,bj+n/2,n/2,n0,[imb[1],imb[1]]); //B11+B22
    let S7 = subtractMatrix(A,A,ai,aj+n/2,ai+n/2,aj+n/2,n/2,n0,[imb[0],imb[0]]); //A12-A22
    let S8 = addMatrix(B,B,bi+n/2,bj,bi+n/2,bj+n/2,n/2,n0,[imb[1],imb[1]]); //B21+B22
    let S9 = subtractMatrix(A,A,ai,aj,ai+n/2,aj,n/2,n0,[imb[0],imb[0]]); //A11-A21
    let S10 = addMatrix(B,B,bi,bj,bi,bj+n/2,n/2,n0,[imb[1],imb[1]]); //B11+B12
    
    //STEP 3
    let P1 = multiplyMatrix2Recursive(A,S1,ai,aj,0,0,n/2,n0,[imb[0],false]); //A11*S1
    let P2 = multiplyMatrix2Recursive(S2,B,0,0,bi+n/2,bj+n/2,n/2,n0,[false,imb[1]]); //S2*B22
    let P3 = multiplyMatrix2Recursive(S3,B,0,0,bi,bj,n/2,n0,[false,imb[1]]); //S3*B11
    let P4 = multiplyMatrix2Recursive(A,S4,ai+n/2,aj+n/2,0,0,n/2,n0,[imb[0], false]); //A22*S4
    let P5 = multiplyMatrix2Recursive(S5,S6,0,0,0,0,n/2,n0,[false,false]); //S5*S6
    let P6 = multiplyMatrix2Recursive(S7,S8,0,0,0,0,n/2,n0,[false,false]); //S7*S8
    let P7 = multiplyMatrix2Recursive(S9,S10,0,0,0,0,n/2,n0,[false,false]); //S9*S10
    
    //STEP 4
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

//We add A[ai...ai+n][aj...aj+n] with B[bi...bi+n][bj...bj+n]
//If ai >= n0 || aj >= n0, return B.
function addMatrix(A,B,ai,aj,bi,bj,n,n0,inputMatrixBool) {
  if (inputMatrixBool[0] === true) {
    if (ai >= n0 || aj >= n0) {
      console.log("Empty")
      return B;
    }
  }
  if (inputMatrixBool[1] === true) {
    if (bi >= n0 || bj >= n0) {
      console.log("Empty")
      return A;
    }
  }
  let C = createSquareMatrix(n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      C[i][j] = A[ai+i][aj+j] + B[bi+i][bj+j];
    }
  }
  return C;
}
function subtractMatrix(A,B,ai,aj,bi,bj,n,n0,inputMatrixBool) {
  if (inputMatrixBool[0] === true) {
    if (ai >= n0 || aj >= n0) {
      console.log("Empty")
      return B;
    }
  }
  if (inputMatrixBool[1] === true) {
    if (bi >= n0 || bj >= n0) {
      console.log("Empty")
      return A;
    }
  }
  let C = createSquareMatrix(n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      C[i][j] = A[ai+i][aj+j] - B[bi+i][bj+j];
    }
  }
  return C;
}
module.exports = {
  multiplyMatrix,
  multiplyMatrix2
}