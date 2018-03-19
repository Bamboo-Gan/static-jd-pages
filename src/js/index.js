$(function () {
	// console.log('我进来了');
	var $moreItems = $(".main-nav .more-items > div");
	var $Itemslis = $(".main-nav .single-goods ul li");
	// console.log($moreItems);
	$Itemslis.each(function (i,val) {
		val.index = i;
		// console.log(val.index);
		var that = val;
		$(val).on('mouseenter',function () {
			// var index = i;
			
			$moreItems.each(function (i,val) {
				// console.log($(this));
				// $(this).css({display:"block"});
				// console.log($(val).get(that.index));
				// $(val).get(index).css({display:"block"});
				// console.log(that.index);
				// console.log(that.index);
				if( i === that.index) {
					$(this.parentNode).css({display:"block"});
					$(this).css({display:"block"});
				}
			})
		})
		$(val).on('mouseleave',function () {
			// var index = i;
			
			$moreItems.each(function (i,val) {
				// console.log($(this));
				// $(this).css({display:"block"});
				// console.log($(val).get(that.index));
				// $(val).get(index).css({display:"block"});
				// console.log(that.index);
				// console.log(that.index);
				if( i === that.index) {
					$(this.parentNode).css({display:"none"});
					$(this).css({display:"none"});
				}
			})
		})
	})
})