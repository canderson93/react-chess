(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,i){e.exports=i(34)},22:function(e,t,i){},28:function(e,t,i){},30:function(e,t,i){},32:function(e,t,i){},34:function(e,t,i){"use strict";i.r(t);var n=i(0),r=i.n(n),a=i(9),c=i.n(a),o=(i(22),i(1)),l=i(5),u=i(3),s=i(2),p=i(4),f=i(7),h=i(10),y=function(){function e(t){Object(o.a)(this,e),this.board=[],this.board=t}return Object(l.a)(e,[{key:"getTile",value:function(e,t){return t<0||t>=this.board.length?null:e<0||e>=this.board[0].length?null:this.board[t][e]}},{key:"getTilesBetween",value:function(e,t){var i=e.x,n=e.y,r=t.x-e.x,a=t.y-e.y;if(Math.abs(r)!==Math.abs(a)&&0!==r&&0!==a)return[];var c=[];for(r=r/Math.abs(r)||r,a=a/Math.abs(a)||a;i!==t.x||n!==t.y;)c.push(this.getTile(i,n)),i+=r,n+=a;return c}},{key:"getAllPieces",value:function(){var e=[];return this.board.forEach(function(t){t.forEach(function(t){t.piece&&e.push(t)})}),e}},{key:"getAllPiecesOfType",value:function(e){return this.getAllPieces().filter(function(t){return t.piece.type===e})}},{key:"getPlayerPieces",value:function(e){return this.getAllPieces().filter(function(t){return t.piece.player===e})}},{key:"clearState",value:function(){this.board.forEach(function(e){e.forEach(function(e){e.actions=[],e.piece&&(e.piece.actions=[])})})}},{key:"toStore",value:function(){return this.board}}],[{key:"parseBoard",value:function(e){var t=this,i=[],n=e.split(";");return n.splice(n.length-1,1),n.forEach(function(e,n){var r=e.split(",");r=r.map(function(e,i){var r=e.trim(),a=null;r&&(a={player:t.parsePlayer(r),type:t.parsePiece(r)});var c={x:i,y:n,piece:a};return a&&(a.tile=c),c}),i.push(r)}),i}},{key:"parsePlayer",value:function(e){if("string"!==typeof e&&2!==e.length)return null;switch(e.charAt(0)){case"B":return"black";case"W":return"white";default:return null}}},{key:"parsePiece",value:function(e){if("string"!==typeof e&&2!==e.length)return null;switch(e.charAt(1)){case"K":return"king";case"Q":return"queen";case"B":return"bishop";case"R":return"rook";case"N":return"knight";case"P":return"pawn";default:return null}}}]),e}(),b=function(){function e(){Object(o.a)(this,e)}return Object(l.a)(e,null,[{key:"atTurnStart",value:function(e){return e}},{key:"beforeMove",value:function(e){return e}},{key:"stateCheck",value:function(e){return e}},{key:"execute",value:function(e,t){return e}},{key:"afterMove",value:function(e){return e}}]),e}(),v=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,null,[{key:"atTurnStart",value:function(e){return e.board.getAllPiecesOfType(this.type).forEach(this.markAllowedMoves.bind(this,e)),e}},{key:"execute",value:function(e,t){if("MOVE_PIECE"!==t.type)return e;if(t.piece.type!==this.type)return e;var i=e.selectedTile,n=t.tile;return i.piece=null,n.piece=t.piece,t.piece.tile=n,e}},{key:"markAllowedMoves",value:function(e,t){var i=this,n=t.piece;this.allowedMoves.forEach(function(r){var a=t.x,c=t.y;a+=r.x,c+=r.y;for(var o=e.board.getTile(a,c);null!==o;){var l={type:"ATTACK_PIECE",piece:n,tile:o,action:!1};if(o.actions.push(l),n.actions.push(l),o.piece&&o.piece.player===n.player)break;var u={type:"MOVE_PIECE",piece:n,tile:o,action:!0};if(o.actions.push(u),n.actions.push(u),!i.repeat)break;if(o.piece&&o.piece.player!==n.player){for(a+=r.x,c+=r.y,o=e.board.getTile(a,c);null!==o&&(!o.piece||o.piece.player!==n.player);){var s={type:"ATTACK_PINNED",piece:n,tile:o,action:!1};if(o.actions.push(s),n.actions.push(s),o.piece&&o.piece.player!==n.player)break;a+=r.x,c+=r.y,o=e.board.getTile(a,c)}break}a+=r.x,c+=r.y,o=e.board.getTile(a,c)}})}}]),t}(b);v.allowedMoves=[],v.type="",v.repeat=!0;var d=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),t}(v);d.allowedMoves=[{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}],d.type="bishop",d.repeat=!0;var O=d,E=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),t}(v);E.allowedMoves=[{x:0,y:1},{x:0,y:-1},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:0},{x:-1,y:1},{x:-1,y:-1}],E.type="king",E.repeat=!1;var k=E,g=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),t}(v);g.allowedMoves=[{x:1,y:2},{x:1,y:-2},{x:-1,y:2},{x:-1,y:-2},{x:2,y:1},{x:2,y:-1},{x:-2,y:1},{x:-2,y:-1}],g.type="knight",g.repeat=!1;var j=g,T=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,null,[{key:"markAllowedMoves",value:function(e,t){var i=t.piece,n="white"===i.player?-1:1,r=t.x,a=t.y,c=e.board.getTile(r,a+n);if(c&&!c.piece){var o={type:"MOVE_PIECE",piece:i,tile:c,action:!0};c.actions.push(o),i.actions.push(o)}[{x:1,y:n},{x:-1,y:n}].forEach(function(t){var n=e.board.getTile(r+t.x,a+t.y);if(null!==n){var c={type:"ATTACK_PIECE",piece:i,tile:n,action:!1};if(n.actions.push(c),i.actions.push(c),n.piece&&n.piece.player!==i.player){var o={type:"MOVE_PIECE",piece:i,tile:n,action:!0};n.actions.push(o),i.actions.push(o)}}})}}]),t}(v);T.type="pawn",T.repeat=!1;var x=T,P=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,null,[{key:"atTurnStart",value:function(e){return e.board.getAllPiecesOfType("pawn").forEach(this.markAllowedMoves.bind(this,e)),e}},{key:"markAllowedMoves",value:function(e,t){var i=t.piece,n="white"===i.player?-1:1,r="white"===i.player?6:1,a=t.x,c=t.y;if(c===r){var o=e.board.getTile(a,c+n);if(!o.piece&&!(o=e.board.getTile(a,c+2*n)).piece){var l={type:"MOVE_PIECE",piece:i,tile:o,action:!0};o.actions.push(l),i.actions.push(l)}}}}]),t}(b),w=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),t}(v);w.allowedMoves=[{x:0,y:1},{x:0,y:-1},{x:1,y:0},{x:1,y:1},{x:1,y:-1},{x:-1,y:0},{x:-1,y:1},{x:-1,y:-1}],w.type="queen",w.repeat=!0;var A=w,C=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),t}(v);C.allowedMoves=[{x:0,y:1},{x:0,y:-1},{x:1,y:0},{x:-1,y:0}],C.type="rook",C.repeat=!0;var m=C,M=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,null,[{key:"beforeMove",value:function(e){return e.board.getAllPiecesOfType("king").forEach(this.markAllowedMoves.bind(this,e)),e}},{key:"execute",value:function(e,t){if("CASTLE"!==t.type)return e;if("king"!==t.piece.type)return e;var i=e.selectedTile,n=t.tile,r=t.rook,a=t.rookTile;return n.piece=t.piece,n.piece.tile=n,i.piece=null,a.piece=r.piece,a.piece.tile=a,r.piece=null,e}},{key:"markAllowedMoves",value:function(e,t){var i="white"===t.piece.player?7:0,n=e.board.getTile(7,i),r=e.board.getTile(0,i);this.hasMoved(e,t)||(this.setupCastle(e,t,n,1),this.setupCastle(e,t,r,-1))}},{key:"setupCastle",value:function(e,t,i,n){if(!i.piece||"rook"!==i.piece.type||i.piece.player!==t.piece.player)return!1;var r=!this.hasMoved(e,i),a=e.board.getTile(t.x+2*n,t.y),c=e.board.getTilesBetween(t,i);if(c.forEach(function(e){e.piece&&e.piece!==t.piece&&e.piece!==i.piece&&(r=!1)}),(c=e.board.getTilesBetween(t,a)).forEach(function(e){e.actions.filter(function(e){return"ATTACK_PIECE"===e.type&&e.piece.player!==t.piece.player}).length&&(r=!1)}),r){var o={type:"CASTLE",piece:t.piece,rook:i,rookTile:e.board.getTile(t.x+n,t.y),tile:a,action:!0};a.actions.push(o),t.piece.actions.push(o)}}},{key:"hasMoved",value:function(e,t){var i=!1;return e.history.forEach(function(e){e.to.x===t.x&&e.to.y===t.y&&(i=!0)}),i}}]),t}(b),B=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,null,[{key:"beforeMove",value:function(e){return e.board.getAllPiecesOfType("king").forEach(this.pruneMoves.bind(this,e)),e}},{key:"pruneMoves",value:function(e,t){t.actions.filter(function(e){return"ATTACK_PIECE"===e.type&&e.piece.player!==t.piece.player}).forEach(function(i){var n=i.piece,r=e.board.getTilesBetween(i.piece.tile,t).filter(function(e){var t=i.piece.tile===n.tile;return e.actions.filter(function(e){return"ATTACK_PIECE"===e.type}).forEach(function(e){e.piece===n&&(t=!0)}),t});r.length||(r=[i.piece.tile]),e.board.getPlayerPieces("white"===n.player?"black":"white").map(function(e){return e.piece}).filter(function(e){return"king"!==e.type}).forEach(function(e){e.actions=e.actions.filter(function(e){return"MOVE_PIECE"===e.type}).filter(function(e){var t=!1;if(r.forEach(function(i){i.x===e.tile.x&&i.y===e.tile.y&&(t=!0)}),t)console.log(e);else{var i=e.tile.actions.indexOf(e);e.tile.actions.splice(i,1)}return t})})})}}]),t}(b),I=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,null,[{key:"beforeMove",value:function(e){return e.board.getAllPiecesOfType("king").forEach(this.pruneMoves.bind(this,e)),e}},{key:"pruneMoves",value:function(e,t){t.piece.actions=t.piece.actions.filter(function(e){if("MOVE_PIECE"!==e.type)return!0;var i=!0;if(e.tile.actions.forEach(function(e){"ATTACK_PIECE"===e.type&&e.piece.player!==t.piece.player&&(i=!1)}),!i){var n=e.tile.actions.indexOf(e);e.tile.actions.splice(n,1)}return i})}}]),t}(b),_=[O,j,k,x,P,A,m,M,function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,null,[{key:"beforeMove",value:function(e){return e.board.getAllPiecesOfType("king").forEach(this.pruneMoves.bind(this,e)),e}},{key:"pruneMoves",value:function(e,t){t.actions.filter(function(e){return"ATTACK_PINNED"===e.type}).forEach(function(i){var n=e.board.getTilesBetween(i.piece.tile,t),r=null;n.forEach(function(e){e.piece&&!e.piece.player!==t.piece.player&&(e.x===t.x&&e.y===t.y||(r=e.piece))}),console.log(r),r.actions=r.actions.filter(function(e){return"MOVE_PIECE"===e.type}).filter(function(e){console.log(e);var t=!1;if(n.forEach(function(i){i.x===e.tile.x&&i.y===e.tile.y&&(console.log(e,i),t=!0)}),!t){console.log(e);var i=e.tile.actions.indexOf(e);e.tile.actions.splice(i,1),console.log(e.tile.actions)}return t})})}}]),t}(b),B,I,function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,null,[{key:"stateCheck",value:function(e){return e.board.getAllPiecesOfType("king").forEach(this.checkForWinner.bind(this,e)),e}},{key:"checkForWinner",value:function(e,t){var i=t.piece.player;if(!this.getAttackingPieces(t,i).length)return e;var n=e.board.getPlayerPieces(i).map(function(e){return e.piece}),r=!0;n.forEach(function(e){e.actions.filter(function(e){return"MOVE_PIECE"===e.type}).length&&(r=!1)}),r&&(e.winner=!0,e.message="The game was won by "+("white"===i?"black":"white"))}},{key:"getAttackingPieces",value:function(e,t){return e.actions.filter(function(t){return"ATTACK_PIECE"===t.type&&t.piece.player!==e.piece.player})}}]),t}(b),function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,null,[{key:"stateCheck",value:function(e){return e.board.getAllPiecesOfType("king").forEach(this.checkForWinner.bind(this,e)),e}},{key:"checkForWinner",value:function(e,t){var i=t.piece.player;if(this.getAttackingPieces(t,i).length)return e;var n=e.board.getPlayerPieces(i).map(function(e){return e.piece}),r=!0;n.forEach(function(e){e.actions.filter(function(e){return"MOVE_PIECE"===e.type}).length&&(r=!1)}),r&&(e.winner=!0,e.message="The game was a draw")}},{key:"getAttackingPieces",value:function(e,t){return e.actions.filter(function(t){return"ATTACK_PIECE"===t.type&&t.piece.player!==e.piece.player})}}]),t}(b)],W={winner:!1,message:"",player:"white",selectedTile:null,board:y.parseBoard("\n    BR,BN,BB,BQ,BK,BB,BN,BR;\n    BP,BP,BP,BP,BP,BP,BP,BP;\n    ,,,,,,,;\n    ,,,,,,,;\n    ,,,,,,,;\n    ,,,,,,,;\n    WP,WP,WP,WP,WP,WP,WP,WP;\n    WR,WN,WB,WQ,WK,WB,WN,WR;\n    "),history:[]},S=Object(h.b)(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,t=arguments.length>1?arguments[1]:void 0;if(e.winner&&"RESET_GAME"!==t.type)return e;switch(e=Object.assign({},e),t.type){case"SELECT_PIECE":return e=Object.assign(e,{selectedTile:t.tile});case"RESET_GAME":return W;default:return e.board=new y(e.board),_.forEach(function(i){return e=i.execute(e,t)}),t.tile&&t.action&&e.history.push({from:{x:e.selectedTile.x,y:e.selectedTile.y},to:{x:t.tile.x,y:t.tile.y}}),t.type.indexOf("@@redux")<0&&(e.player="white"===e.player?"black":"white"),e.board.clearState(),e.selectedTile=null,_.forEach(function(t){return e=t.atTurnStart(e)}),_.forEach(function(t){return e=t.beforeMove(e)}),_.forEach(function(t){return e=t.stateCheck(e)}),e.board=e.board.toStore(),e}}),K=(i(28),function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"getPiece",value:function(){var e=this.props.tile.piece,t=e?e.player:"";return t&&e?"".concat(t," ").concat(e.type):""}},{key:"isLegal",value:function(){var e=this;if(!this.props.selectedTile||!this.props.selectedTile.piece)return!1;var t=this.props.selectedTile.piece,i=!1;return t.actions.filter(function(t){return t.tile===e.props.tile&&!0===t.action}).forEach(function(t){t.tile.x===e.props.tile.x&&t.tile.y===e.props.tile.y&&(i=!0)}),i}},{key:"handleClick",value:function(){var e=this,t=this.props.selectedTile;if(t&&t.piece&&t.piece.player===this.props.player){var i=this.props.tile.actions.filter(function(e){return e.piece===t.piece&&"ATTACK_PIECE"!==e.type});if(i.forEach(function(t){e.props.dispatch(t)}),i.length)return}this.props.dispatch({type:"SELECT_PIECE",tile:this.props.tile})}},{key:"render",value:function(){var e=this.isLegal(),t=!1;return this.props.selectedTile&&(t=this.props.selectedTile.x===this.props.tile.x&&this.props.selectedTile.y===this.props.tile.y),r.a.createElement("div",{id:this.props.id,"data-x":this.props.tile.x,"data-y":this.props.tile.y,className:"tile ".concat(this.getPiece()," ").concat(t?"selected":""," ").concat(e?"legal":""),onClick:this.handleClick.bind(this)})}}],[{key:"parsePlayer",value:function(e){if("string"!==typeof e&&2!==e.length)return null;switch(e.charAt(0)){case"B":return"black";case"W":return"white";default:return null}}},{key:"parsePiece",value:function(e){if("string"!==typeof e&&2!==e.length)return null;switch(e.charAt(1)){case"K":return"king";case"Q":return"queen";case"B":return"bishop";case"R":return"rook";case"N":return"knight";case"P":return"pawn";default:return null}}}]),t}(n.Component));var N=Object(f.b)(function(e){return{player:e.player,selectedTile:e.selectedTile}})(K),V=(i(30),function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"drawBoard",value:function(){var e="A".charCodeAt(0);return this.props.board.map(function(t){var i=[],n=0,a=t.map(function(t){var i=String.fromCharCode(e)+n;return n+=1,r.a.createElement(N,{id:i,key:i,tile:t})});return i.push(r.a.createElement("div",{key:String.fromCharCode(e),className:"row"},a)),e+=1,i})}},{key:"render",value:function(){return r.a.createElement("div",{className:"board ".concat(this.props.player," ").concat(this.props.history.length?"playing":"")},this.props.winner?this.props.message:"",this.drawBoard.apply(this))}}],[{key:"parseRowCol",value:function(e){return{row:e.charCodeAt(0)-"A".charCodeAt(0),col:parseInt(e.charAt(1))}}}]),t}(n.Component));var R=Object(f.b)(function(e){return{winner:e.winner,message:e.message,player:e.player,selectedTile:e.selectedTile,board:e.board,history:e.history}})(V),L=(i(32),function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(f.a,{store:S},r.a.createElement("div",{className:"App"},r.a.createElement(R,null)))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,2,1]]]);
//# sourceMappingURL=main.7b122c4c.chunk.js.map