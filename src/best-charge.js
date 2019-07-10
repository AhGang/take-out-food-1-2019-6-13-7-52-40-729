'use strict';
/* 10min*/ 
function getItemList(selectedItems){
  var list = {}; 
  selectedItems.forEach(selectedItem =>{
    let itemDetail = selectedItem.split(" x ");          
          list[itemDetail[0]] = itemDetail[1]
  })    
  return list; 
}
/* 20min*/ 
function getBill(ItemList,allItems){
  var expected = `============= 订餐明细 =============\n`;
  var total = 0;
  var selectedItemInfo = [];
  for(let key in ItemList){
    allItems.forEach(i => {
      if(key == i.id){
        total += i.price * ItemList[key]
        selectedItemInfo.push({id:i.id,name:i.name,price:i.price})
        expected = expected.concat(`${i.name} x ${ItemList[key]} = ${i.price * ItemList[key]}元\n`)
      }
    })
  }
  expected = expected.concat(`-----------------------------------\n`)
  expected = checkPromotions(total,ItemList,selectedItemInfo,expected)
  return expected;
}
/* 25min*/ 
function checkPromotions(total,ItemList,selectedItemInfo,expected){
  let allPromotions = loadPromotions();
  let firstDiscount = 0;
  let secondDiscount = {sum:0,name:[]}; 
  if(total >= 30){
    firstDiscount = 6;
  }
  secondDiscount= getSecondDiscount(ItemList,selectedItemInfo,allPromotions)
  if(secondDiscount.sum > firstDiscount){
    let type = allPromotions[1].type
    expected = expected.concat(`使用优惠:\n指定菜品半价(${secondDiscount.name.join("，")})，省${secondDiscount.sum}元\n-----------------------------------\n总计：${total - secondDiscount.sum}元\n===================================`)
  }
  else if(firstDiscount != 0){
    expected = expected.concat(`使用优惠:\n满30减6元，省6元\n-----------------------------------\n总计：${total - firstDiscount}元\n===================================`)
    
  }
  else{
    if(firstDiscount == 0 && secondDiscount.sum == 0){
      expected = expected.concat(`总计：${total}元\n===================================`)
      }
  }
  return expected;
}
/* 10min*/ 
function getSecondDiscount(ItemList,selectedItemInfo,allPromotions){
  var Discont = {sum:0,name:[]};
  for(let key in ItemList){
   if(allPromotions[1].items.includes(key)){
    selectedItemInfo.forEach(i => {
      if(i.id == key){
        Discont.sum += i.price / 2;
        Discont.name.push(i.name);
      }
    })
   }
  }
  return Discont;
}
/* 3min*/ 
function bestCharge(selectedItems) {
  let allItems = loadAllItems();
  let ItemList = getItemList(selectedItems);
  let expected = getBill(ItemList,allItems);
  return expected;
}