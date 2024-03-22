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

  hash(key) {
    return crypto.createHash("md5").update(key).digest("hex");
  }

  getNodeForKey(key) {
    const hash = this.hash(key);
    const targetHash = this.findClosestHash(hash);
    return this.hashRing[targetHash];
  }

  findClosestHash(hash) {
    for (const ringHash of this.sortedHashes) {
      if (ringHash >= hash) {
        return ringHash;
      }
    }
    return this.sortedHashes[0];
  }
}

// Example usage
const nodes = ["node1", "node2", "node3"];
const ch = new ConsistentHashing(nodes);
