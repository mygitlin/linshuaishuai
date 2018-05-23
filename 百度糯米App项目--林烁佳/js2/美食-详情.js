$(function () {
   for(let i=2;i<4;i++){
       $('.taoc ul li').eq(i).css({'display':'none'});
       $('.taoc ul hr').eq(i).css({'display':'none'});
   }
   $('#two').on('click',function () {
       for(let i=2;i<4;i++){
           $('.taoc ul li').eq(i).css({'display':'block'});
           $('.taoc ul hr').eq(i).css({'display':'block'});
       }
       $(this).hide().off('click');
   })
});