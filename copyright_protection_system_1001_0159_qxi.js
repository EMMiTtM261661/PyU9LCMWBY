// 代码生成时间: 2025-10-01 01:59:24
 * This system detects and prevents unauthorized usage of protected content.
 */

class CopyrightProtectionSystem {

  constructor() {
    this.protectedContent = []; // Array to store protected content
    this.contentHash = {}; // Object to store hash values of content
  }

  // Function to add protected content
  addProtectedContent(content) {
    if (!content) {
      throw new Error('Content cannot be undefined or null');
    }
    const hash = this.generateHash(content);
    if (!this.contentHash[hash]) {
      this.protectedContent.push(content);
      this.contentHash[hash] = true;
      console.log('Content added successfully');
    } else {
      console.log('Content already protected');
    }
  }

  // Function to remove protected content
  removeProtectedContent(content) {
    if (!content) {
      throw new Error('Content cannot be undefined or null');
    }
    const hash = this.generateHash(content);
    if (this.contentHash[hash]) {
      const index = this.protectedContent.findIndex(c => this.generateHash(c) === hash);
      if (index !== -1) {
        this.protectedContent.splice(index, 1);
        delete this.contentHash[hash];
        console.log('Content removed successfully');
      }
    } else {
      console.log('Content not found');
    }
  }

  // Helper function to generate hash for content
  generateHash(content) {
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(content));
    const hashBuffer = crypto.subtle.digest('SHA-256', data);
    return hashBuffer.then(buffer => {
      const hashArray = Array.from(new Uint8Array(buffer));
      const hashHex = hashArray
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      return hashHex;
    });
  }

  // Function to check if content is protected
  isProtected(content) {
    const hash = this.generateHash(content);
    return hash.then(hashHex => {
      return this.contentHash[hashHex];
    });
  }

  // Function to display all protected content
  displayProtectedContent() {
    console.log('Protected Content:', this.protectedContent);
  }
}

// Example usage
const copyrightSystem = new CopyrightProtectionSystem();
copyrightSystem.addProtectedContent("This is protected text");
copyrightSystem.isProtected("This is protected text").then(isProtected => {
  console.log("Is protected: ", isProtected);
});
copyrightSystem.displayProtectedContent();