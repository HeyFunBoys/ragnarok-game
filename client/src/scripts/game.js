import init from '../util/gameSetup';
import inGame from '../util/inGameFunctions';
import helper from '../util/helperFunctions';
import vrHelpers from '../util/vrHelpers';

/*CONTENTS
THREE:  WIDTH, HEIGHT, scene, renderer, element, camera,
        pointLight, textureLoader, raycaster, camMouse, mouse

GAME VARS: players, roleColors, selected, clickEvent
*/

export default {
  init: function() {
    init.call(this); 
  },
  // Helper functions
  intersect: helper.intersect,
  addSign: helper.addSign,
  addButton: helper.addButton,
  removeObject: helper.removeObject,
  addClickEventListener: helper.addClickEventListener,
  removeClickEventListener: helper.removeClickEventListener,
  itemSelection: helper.itemSelection,

  // In-game functions
  addPlayer: inGame.addPlayer,
  removePlayer: inGame.removePlayer,
  assignRoles: inGame.assignRoles,
  pickParty: inGame.pickParty,
  partyButtons: inGame.partyButtons,
  questButtons: inGame.questButtons,

  // VR specific functions
  addVRPressEventListener: vrHelpers.addVRPressEventListener,
  removeVREventListener: vrHelpers.removeVREventListener,
  selectionDetection: vrHelpers.selectionDetection

};