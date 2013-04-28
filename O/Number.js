/**
 * 
 */
var O = O || {};
O.Number = {

	/**
	 * 将数字转化为中文
	 */
	toCn: function(num) {
		if(!/^\d*(\.\d*)?$/.test(num))throw(new Error(-1, "Number is wrong!"));
		var AA = ["零","一","二","三","四","五","六","七","八","九"];
		var BB = ["","十","百","千","万","亿","点",""];

		var a = (""+ num).replace(/(^0*)/g, "").split("."),		//将前面的0给去掉, 并分割小数(lz)和整数(z)部分
			z = a[0], lz = a[1],
			k = 0,
			re = "";	//存放结果

		for (var i = z.length - 1; i >= 0; i--) {
			switch(k){
				case 0 :
					re = BB[7] + re;
					break;
				case 4 : 
					if (!new RegExp("0{4}\\d{"+ (z.length - i - 1) +"}$").test(z)) {
						re = BB[4] + re;
					}
					break;
				case 8 :
					re = BB[5] + re;
					BB[7] = BB[5];
					k = 0;
					break;
			}


			// 若出现类似"101"、"1001"此类情况, 前面要补"零", 即AA[0]
			// 这里判断的是
			// 1. 十位为"0", 往前数一位不是"0", 类似"101"、"1010000"
			// 2. 百位为"0", 往前数两位不是"0", 类似"11011"
			var nfz = (re.indexOf(AA[0]) != 0);
			var iz = (z.charAt(i) == "0");
			if (((k % 4 == 1 && z.charAt(i + 1) != "0") 
					|| (k % 4 == 2 && z.charAt(i + 2) != "0")) && iz && nfz) {
				re = AA[0] + re;
			}

			if (!iz) {
				re = AA[z.charAt(i)] + BB[k % 4] + re;
			}

			k++;
		}

		// 处理小数部分
		if (a.length > 1) {
			re += BB[6];
			for(var i = 0; i < lz.length; i++){
				re += AA[lz.charAt(i)];
				if(i == 2)
					break;
			}
		}

		// 整数部分为0的情况下, 前面补"零"
		if (z == "") {
			re = (AA[0] + re);
		}

		// 去掉一十在前面的时候
		if (re.indexOf(AA[1] + BB[1]) == 0) {
			re = re.replace(AA[1], "");
		}

		return re;
	},

	/**
	 * 将数值转换为中文金额大写
	 */
	toCapitalMoney: function(num) {
		if(!/^\d*(\.\d*)?$/.test(num))throw(new Error(-1, "Number is wrong!"));
		var AA = ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"];
		var BB = ["","拾","佰","仟","萬","億","圆",""];
		var CC = ["角", "分", "厘"];

		var a = (""+ num).replace(/(^0*)/g, "").split("."),		//将前面的0给去掉, 并分割小数(lz)和整数(z)部分
			z = a[0], lz = a[1],
			k = 0,
			re = "";	//存放结果

		// 处理整数部分, 从小位向高位依次处理, 每四位统一处理, 使用(k % 4)来重用逻辑
		for(var i = z.length - 1; i >= 0; i--){
			switch(k){
				case 0 :
					re = BB[7] + re;
					break;
				case 4 : 
					if (!new RegExp("0{4}\\d{"+ (z.length - i - 1) +"}$").test(z)) {
						re = BB[4] + re;
					}
					break;
				case 8 :
					re = BB[5] + re;
					BB[7] = BB[5];
					k = 0;
					break;
			}

			// 若出现类似"101"、"1001"此类情况, 前面要补"零", 即AA[0]
			// 这里判断的是
			// 1. 十位为"0", 往前数一位不是"0", 类似"101"、"1010000"
			// 2. 百位为"0", 往前数两位不是"0", 类似"11011"
			var nfz = (re.indexOf(AA[0]) != 0);
			var iz = (z.charAt(i) == "0");
			if (((k % 4 == 1 && z.charAt(i + 1) != "0") 
					|| (k % 4 == 2 && z.charAt(i + 2) != "0")) && iz && nfz) {
				re = AA[0] + re;
			}

			if (!iz) {
				re = AA[z.charAt(i)] + BB[k % 4] + re;
			}

			k++;
		}

		// 处理小数部分
		if (a.length > 1) {
			re += BB[6];
			for(var i = 0; i < lz.length; i++){
				re += AA[lz.charAt(i)] + CC[i];
				if(i == 2)
					break;
			}
			if(lz.charAt(0)=="0" && lz.charAt(1)=="0"){
				re+="圆整";
			}
		} else {
			re+="圆整";
		}

		// 整数部分为0的情况下, 前面补"零"
		if (z == "") {
			re = (AA[0] + re);
		}

		// 去掉一十在前面的时候
		if (re.indexOf(AA[1] + BB[1]) == 0) {
			re = re.replace(AA[1], "");
		}

		return re;
	}
};