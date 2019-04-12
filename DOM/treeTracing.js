function walkUp(nodeID, callback) {
  callback(nodeID);
  if (nodeID === 1) { return; }
  var currentNode = document.getElementById(nodeID);
  var nodeParent = currentNode.parentNode;
  var parentNodeId = Number(nodeParent.getAttribute('id'));
  walkUp(parentNodeId, callback);
}

function elementAndSiblings(nodeID) {
  var parent = document.getElementById(nodeID).parentNode;
  return Array.prototype.slice.call(parent.children);
}

function domTreeTracer(nodeID) {
  var collection = [];
  walkUp(nodeID, function(nodeID) {
    collection.push(elementAndSiblings(nodeID));
  });
  return collection.map(function(childnodes) {
    return childnodes.map(function(node) {
      return node.nodeName;
    })
  })
}