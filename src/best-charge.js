'use strict';
/* 8min/10min*/ 
function getItemList(selectedItems){
  var list = {}; 
  selectedItems.forEach(selectedItem =>{
    let itemDetail = selectedItem.split(" x ");          
          list[itemDetail[0]] = itemDetail[1]
  })    
  return list; 
}
/* 15min/20min*/ 
function getBill(itemList,allItems){
  var expected = `============= 订餐明细 =============\n`;
  var total = 0;
  var selectedItemInfo = [];
  var keys = Object.keys(itemList)
  keys.forEach(id => {
    const item = allItems.filter(item => item.id == id)[0]
    total += item.price * itemList[id]
        selectedItemInfo.push({id:item.id,name:item.name,price:item.price})
        expected = expected.concat(`${item.name} x ${itemList[id]} = ${item.price * itemList[id]}元\n`)
  })
  expected = expected.concat(`-----------------------------------\n`)
  expected = checkPromotions(total,itemList,selectedItemInfo,expected)
  return expected;
}
/* 18min/25min*/ 
function checkPromotions(total,itemList,selectedItemInfo,expected){
  let allPromotions = loadPromotions();
  let firstDiscount = 0;
  let secondDiscount = {sum:0,name:[]}; 
  if(total >= 30){
    firstDiscount = 6;
  }
  secondDiscount= getSecondDiscount(itemList,selectedItemInfo,allPromotions)
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
/* 8min/10min*/ 
function getSecondDiscount(itemList,selectedItemInfo,allPromotions){
  var Discont = {sum:0,name:[]};
  var keys = Object.keys(itemList).filter(key =>(allPromotions[1].items.includes(key)) )
  selectedItemInfo.forEach(i => {
    if(keys.includes(i.id)){
      Discont.sum += i.price / 2;
      Discont.name.push(i.name);
    }
  })
  return Discont;
}
/* 1min/3min*/ 
function bestCharge(selectedItems) {
  let allItems = loadAllItems();
  let itemList = getItemList(selectedItems);
  let expected = getBill(itemList,allItems);
  return expected;
}