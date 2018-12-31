

class ClickManager {
	constructor() {
		
	}

	onMouseDown(e) {
		//console.log("on mouse down");
	}

	onMouseUp(e) {
		if(window.inGame) {

			const worldX = window.main.cameras.main.scrollX + e.clientX;
        	const worldY = window.main.cameras.main.scrollY + e.clientY;  

			// if user has selection,
			// if selectable is at click location

			// if button === 0 (left click)

			if (e.button === 2) { // (right click)

        		//console.log("right click at " + worldX + ", " + worldY);	

        		if(window.user.hasSelection) {

        			if(window.isWaitingForLocationClick) {
        				console.log("triggering location click");
        				
        				window.onSelectAbilityLocation(worldX, worldY);
        			} else if(window.hoverManager.hasHoverTarget) {
        				console.log("attacking " + window.hoverManager.currentHoverTarget.refno);	
        				window.user.selectedChar.currentTarget = window.hoverManager.currentHoverTarget;
        				window.socketSender.sendTargetRequest(window.user.selectedChar.refno, window.hoverManager.currentHoverTarget.refno);

        			} else {

        				// send off the worldX and worldY to server, with the refno
        				window.socketSender.sendMoveRequest(window.user.selectedChar.refno,
        					worldX, worldY);
        			}
        		}
			}	
		}
		// e.clientX
		// e.clientY
		// e.button

	}
}

export default ClickManager;