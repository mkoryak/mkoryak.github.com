

$(function(){

	var href = window.location.href;
    var pages = ['big-thead.htm', 'border-collapse.htm', 'datatable-with-reflow.htm', 'empty-table.htm', 'init-exceptions.htm', 'positioning-options.htm', 'row-groups.htm'];

    var list = [];
	var $nav = $("ul#dynamic-nav");
	_.each(pages, function(fn){
			var url = "/floatThead/examples/"+fn;
			var name = fn.replace(/-/g, ' ').replace(/(.*?)\.htm/, '$1');
			var rx = new RegExp(fn+"$");
			var active = window.location.href.match(rx) ? "active" : "";
			list.push("<li class='"+active+"'><a href='"+url+"'>"+name+"</a>");
	});
	$nav.html(list.join(''));


	var $tables = $('.load-table');
	if($tables.length){
		$.get('/floatThead/bigtable.htm', function(d){
			var $table = $(d);
			$tables.each(function(){
				var $this = $(this);
				var id = $this.attr('id');
				var clazz = $this.attr('class');
				var $clone = $table.clone();
				$this.replaceWith($clone);
				$clone.attr('id', id);
				$clone.attr('class', clazz);
				$clone.removeClass('load-table');
			})
			$(document).trigger('tables-loaded');
		});
	}
});

var alignmentDebugger = function($table){
    var $cont = $("<div></div>", {
        css: {
            position: 'fixed',
            right: '100px',
            top: '200px',
            border: '1px solid red',
            padding: '10px'
        }
    });
    $('body').append($cont);
    var $button = $('<a href="#" class="btn btn-info">Recalc</a>');
    $cont.append($button); 
    var $tpl = $("<div></div>");
    $cont.append($tpl);
    var $floatContainer = $table.floatThead('getFloatContainer');
    var $floatTable = $floatContainer.find('table');

    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g,
        evaluate: /\{\%(.+?)\%\}/g
    };
    var tpl = _.template('table width: {{tableWidth}}<br/>'+
                         'float table width: {{floatTableWidth}}<br\>'+
                         'table cols: {{tableCols}}<br/>'+
                         'float cols: {{floatCols}}');

    
    var recalc = function(){
        var $tableCols = $table.find('col');
        var $floatCols = $floatTable.find('col');
        var tableColsWidths = _.map($tableCols, function(col){
            return $(col).width();
        });
        var floatColsWidths = _.map($floatCols, function(col){
            return $(col).width();
        });
        var tableWidth = $table.width();
        var floatTableWidth = $floatTable.width();
        $tpl.html(tpl({
            tableWidth: tableWidth,
            floatTableWidth: floatTableWidth,
            tableCols: tableColsWidths.join(', '),
            floatCols: floatColsWidths.join(', ')
        }));
        return false;
    }
    recalc();
    $button.on('click', recalc);
}
var ieVersion = function(){for(var a=3,b=document.createElement("b"),c=b.all||[];b.innerHTML="<!--[if gt IE "+ ++a+"]><i><![endif]-->",c[0];);return 4<a?a:document.documentMode}();

if(ieVersion <= 7.0){
	alert('jQuery.floatThead does not support IE7 or worse. Running this plugin in those browsers will have no effect.');
}