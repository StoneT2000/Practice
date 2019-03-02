class Vertex {
  constructor(value) {
    this.value = value;
  }
  getKey() {
    return this.value;
  }
}
class Edge {
  constructor(startVertex, endVertex, weight = 0) {
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.weight = weight;
  }
}

class Graph {
  constructor(vertices = {}, edges = {}) {
    this.vertices = vertices;
    this.edges = edges;
  }
  
  addVertex(newVertex) {
    this.vertices[newVertex.getKey()] = newVertex;
  }
  addEdge(newEdge) {
    this.edges[newEdge.getKey()] = newEdge;
  }
}
//Uses adjacency matrix as input
class GraphA {
  constructor(adjacency_matrix, vertices = {}) {
    this.vertices = vertices;
    this.adjMatrix = adjacency_matrix;
    this.verticesCount = this.adjMatrix.length;
  }
  
  addVertex(newVertex) {
    
    this.vertices[newVertex.getKey()] = newVertex;
    
    //update adj matrix
    this.adjMatrix.push([]);
    for (let i = 0; i < this.verticesCount; i++) {
      this.adjMatrix[i].push(0)
    }
    const oldVerticesCount = this.verticesCount;
    this.verticesCount += 1;
    for (let i = 0; i < this.verticesCount; i++) {
      this.adjMatrix[oldVerticesCount].push(0);
    }
  }
  addEdge(sv, ev, weight = 0) {

  }
  
  deleteVertex(value) {
    
  }
}