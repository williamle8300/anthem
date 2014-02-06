$(document).ready(function() {

	//escapes chars: [ " & ? = / ]
	function escapeHtml(unsafe) {
	  return unsafe
			.replace(/\t/g, "")
			.replace(/\n/g, "")
			.replace(/&/g, "&amp;")
			.replace(/\//g, "&frasl;")
			.replace(/\?/g, "&63;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;");
	 }

});
