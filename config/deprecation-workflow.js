/* global window */
window.deprecationWorkflow = self.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "macro-computed-deprecated" },
    { handler: "silence", matchId: "ember-component.send-action" },
    { handler: "silence", matchId: "ember-routing.route-router" }
  ]
};
