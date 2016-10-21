(function(){
	// Define a simple class for our data objects
	function Test(title,completed){
		if(completed === undefined) completed = false;
		this._title = title;
		this._completed = completed;
	};
	Test.prototype.title = function(v){ return this._title; }
	Test.prototype.setTitle = function(v){ this._title = v; return this; };
	Test.prototype.completed = function(v){ return this._completed; }
	Test.prototype.setCompleted = function(v){ this._completed = v; return this; };
	
	return Test;

})();