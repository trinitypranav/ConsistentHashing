const crypto = require("crypto");

class ConsistentHashing {
  constructor(nodes = [], replicas = 3) {
    this.nodes = nodes;
    this.replicas = replicas;
    this.hashRing = {};
    this.sortedHashes = [];

    this.initializeHashRing();
  }

  initializeHashRing() {
    for (const node of this.nodes) {
      for (let i = 0; i < this.replicas; i++) {
        const hash = this.hash(`${node}:${i}`);
        this.hashRing[hash] = node;
        this.sortedHashes.push(hash);
      }
    }
    console.log(this.hashRing);
    this.sortedHashes.sort();
  }

}
