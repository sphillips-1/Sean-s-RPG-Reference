function getTreasure(challengeRating) {

	//Get D100 Roll
    var diceRoll = getRandomArbitrary(100);

    //Get Currency
    var Currency = GetGP(challengeRating);

    //Get Loot Formula
    var LootFormula = GetLootFormula(challengeRating, diceRoll);

    //Get GP from Arts and Gems
    var ArtsAndGemsGP = GetArtAndGems(LootFormula.ArtAndGemsGP);

    //Get Magic Items
    var MagicItems = GetMagicItems(LootFormula);

    var MagicItemsFormula = [];

    if (LootFormula.MagicItemDice != "") {
        MagicItemsFormula.push("[" + LootFormula.MagicItemDice + "] items from [" + LootFormula.MagicItemTable + "]");
    }
    if (LootFormula.MagicItemDice2 != "") {
        MagicItemsFormula.push("[" + LootFormula.MagicItemDice2 + "] items from [" + LootFormula.MagicItemTable2 + "]");
    }

    var output = [
        "<b>Challenge Rating [" + challengeRating + "]</b>",
        diceRoll,
        "",
        "<b>Currency</b>",
        "[" + Currency.CP + "] copper pieces, [" + Currency.SP + "] silver pieces, [" + Currency.GP + "] gold pieces, [" + Currency.PP + "] platinum pieces",
        "OR",
        "[" + Currency.Total + "] gold pieces",
        "",
        "<b>GP from Art and Gems</b>",
        "[" + LootFormula.ArtAndGemsGP + "]",
        "[" + ArtsAndGemsGP + "] GP",
        "",
        "<b>Magic Items</b>",
        MagicItemsFormula.join("<br>"),
        "",
        MagicItems.sort().join("<br>")
    ];

    return output;
}



function GetArtAndGems(dice) {

	return rollAndCombineDice(dice);

}


function getRandomArbitrary(max) {
	return Math.floor((Math.random() * max) + 1);
}

function rollAndCombineDice(dice) {
	var diceResults = [];
	var dice;
	var diceFormula = dice.split("d").join(",").split("*").join(",").split(",");
	var numberOfDice = diceFormula[0];
	var diceSize = diceFormula[1];
	for (i = 0; i < numberOfDice; i++) {
		diceResults.push(getRandomArbitrary(diceSize));
	}
	var diceTotal = parseInt(diceResults.reduce((a, b) => a + b, 0));
	if (typeof diceFormula[2] === 'undefined') {
		diceFormula[2] = 1
	}
	diceTotal = diceTotal * diceFormula[2];
	return diceTotal;
}
function GetGP(challengeRating) {

	var table;

	switch (challengeRating) {
		case "Challenge 0-4":
			table = CR4;
			break;
		case "Challenge 5-10":
			table = CR10;
			break;
		case "Challenge 11-16":
			table = CR16;
			break;
		case "Challenge 17+":
			table = CR17;
			break;
	}

	var varCP = rollAndCombineDice(table.CP);
	var varSP = rollAndCombineDice(table.SP);
	var varGP = rollAndCombineDice(table.GP);
	var varPP = rollAndCombineDice(table.PP);


	var CPtoGP = varCP * .01;
	var SPtoGP = varSP * .1;
	var PPtoGP = varPP * 10;

	var varTotalGP = CPtoGP + SPtoGP + varGP + PPtoGP;

	var Currency = {
		CP: varCP,
		SP: varSP,
		GP: varGP,
		PP: varPP,
		Total: varTotalGP
	}

	return Currency;
}

function getRandomArbitrary(max) {
	return Math.floor((Math.random() * max) + 1);
}

function rollAndCombineDice(dice) {
	var diceResults = [];
	var dice;
	var diceFormula = dice.split("d").join(",").split("*").join(",").split(",");
	var numberOfDice = diceFormula[0];
	var diceSize = diceFormula[1];
	for (i = 0; i < numberOfDice; i++) {
		diceResults.push(getRandomArbitrary(diceSize));
	}
	var diceTotal = parseInt(diceResults.reduce((a, b) => a + b, 0));
	if (typeof diceFormula[2] === 'undefined') {
		diceFormula[2] = 1
	}
	diceTotal = diceTotal * diceFormula[2];
	return diceTotal;
}


var CR4 = {
	CP: "6d6*100",
	SP: "3d6*100",
	GP: "2d6*10",
	PP: "0d0*0"
};
var CR10 = {
	CP: "2d6*100",
	SP: "2d6*1000",
	GP: "6d6*100",
	PP: "3d6*10"
};
var CR16 = {
	CP: "0d0*0",
	SP: "0d0*0",
	GP: "4d6*1000",
	PP: "5d6*100"
};
var CR17 = {
	CP: "0d0*0",
	SP: "0d0*0",
	GP: "12d6*1000",
	PP: "8d6*1000"
};

function GetLootFormula(challengeRating, d100) {

	var lootFormula;
	switch (challengeRating) {
		case "Challenge 0-4":
			lootFormula = CR4LootTable(d100);
			break;
		case "Challenge 5-10":
			lootFormula = CR10LootTable(d100);
			break;
		case "Challenge 11-16":
			lootFormula = CR16LootTable(d100);
			break;
		case "Challenge 17+":
			lootFormula = CR17LootTable(d100);
			break;
	}

	return lootFormula;
}

function createFormulaObject(varArtAndGemsGP, varMagicItemDice, varMagicItemTable, varMagicItemDice2, varMagicItemTable2) {

	var object = {
		ArtAndGemsGP: varArtAndGemsGP,
		MagicItemDice: varMagicItemDice,
		MagicItemTable: varMagicItemTable,
		MagicItemDice2: varMagicItemDice2,
		MagicItemTable2: varMagicItemTable2
	};
	return object;
}

function inRange(x, min, max) {
	return min <= x && x <= max;
}

function CR4LootTable(d100) {

	var lootFormula;

	if (inRange(d100, 1, 6)) {
		lootFormula = createFormulaObject("", "", "", "", "");
	} else if (inRange(d100, 7, 16)) {
		lootFormula = createFormulaObject("2d6*10", "", "", "", "");
	} else if (inRange(d100, 17, 26)) {
		lootFormula = createFormulaObject("2d4*25", "", "", "", "");
	} else if (inRange(d100, 27, 36)) {
		lootFormula = createFormulaObject("2d6*50", "", "", "", "");
	} else if (inRange(d100, 37, 44)) {
		lootFormula = createFormulaObject("2d6*10", "1d6", "Magic Item Table A", "", "");
	} else if (inRange(d100, 45, 52)) {
		lootFormula = createFormulaObject("2d4*25", "1d6", "Magic Item Table A", "", "");
	} else if (inRange(d100, 53, 60)) {
		lootFormula = createFormulaObject("2d6*50", "1d6", "Magic Item Table A", "", "");
	} else if (inRange(d100, 61, 65)) {
		lootFormula = createFormulaObject("2d6*10", "1d4", "Magic Item Table B", "", "");
	} else if (inRange(d100, 66, 70)) {
		lootFormula = createFormulaObject("2d4*25", "1d4", "Magic Item Table B", "", "");
	} else if (inRange(d100, 71, 75)) {
		lootFormula = createFormulaObject("2d6*50", "1d4", "Magic Item Table B", "", "");
	} else if (inRange(d100, 76, 78)) {
		lootFormula = createFormulaObject("2d4*10", "1d4", "Magic Item Table C", "", "");
	} else if (inRange(d100, 79, 80)) {
		lootFormula = createFormulaObject("2d4*25", "1d4", "Magic Item Table C", "", "");
	} else if (inRange(d100, 81, 85)) {
		lootFormula = createFormulaObject("2d6*50", "1d4", "Magic Item Table C", "", "");
	} else if (inRange(d100, 86, 92)) {
		lootFormula = createFormulaObject("2d4*25", "1d4", "Magic Item Table F", "", "");
	} else if (inRange(d100, 93, 97)) {
		lootFormula = createFormulaObject("2d6*50", "1d4", "Magic Item Table F", "", "");
	} else if (inRange(d100, 98, 99)) {
		lootFormula = createFormulaObject("2d4*25", "1d1", "Magic Item Table G", "", "");
	} else if (inRange(d100, 100, 100)) {
		lootFormula = createFormulaObject("2d6*50", "1d1", "Magic Item Table G", "", "");
	}

	return lootFormula;
}

function CR10LootTable(d100) {
	var lootFormula;

	if (inRange(d100, 1, 4)) {
		lootFormula = createFormulaObject("", "", "", ",");
	} else if (inRange(d100, 5, 10)) {
		lootFormula = createFormulaObject("2d4*25", "", "", "");
	} else if (inRange(d100, 11, 16)) {
		lootFormula = createFormulaObject("3d6*50", "", "", "");
	} else if (inRange(d100, 17, 22)) {
		lootFormula = createFormulaObject("3d6*100", "", "", "");
	} else if (inRange(d100, 23, 28)) {
		lootFormula = createFormulaObject("2d4*25", "", "", "");
	} else if (inRange(d100, 29, 32)) {
		lootFormula = createFormulaObject("2d4*25", "1d6", "Magic Item Table A", "", "");
	} else if (inRange(d100, 33, 36)) {
		lootFormula = createFormulaObject("3d6*50", "1d6", "Magic Item Table A", "", "");
	} else if (inRange(d100, 37, 40)) {
		lootFormula = createFormulaObject("3d6*100", "1d6", "Magic Item Table A", "", "");
	} else if (inRange(d100, 41, 44)) {
		lootFormula = createFormulaObject("2d4*250", "1d6", "Magic Item Table A", "", "");
	} else if (inRange(d100, 45, 49)) {
		lootFormula = createFormulaObject("2d4*25", "1d4", "Magic Item Table B", "", "");
	} else if (inRange(d100, 50, 54)) {
		lootFormula = createFormulaObject("3d6*50", "1d4", "Magic Item Table B", "", "");
	} else if (inRange(d100, 55, 59)) {
		lootFormula = createFormulaObject("3d6*100", "1d4", "Magic Item Table B", "", "");
	} else if (inRange(d100, 60, 63)) {
		lootFormula = createFormulaObject("2d4*250", "1d4", "Magic Item Table B", "", "");
	} else if (inRange(d100, 64, 66)) {
		lootFormula = createFormulaObject("2d4*25", "1d4", "Magic Item Table C", "", "");
	} else if (inRange(d100, 67, 69)) {
		lootFormula = createFormulaObject("3d6*50", "1d4", "Magic Item Table C", "", "");
	} else if (inRange(d100, 70, 72)) {
		lootFormula = createFormulaObject("3d6*100", "1d4", "Magic Item Table C", "", "");
	} else if (inRange(d100, 73, 74)) {
		lootFormula = createFormulaObject("2d4*250", "1d4", "Magic Item Table C", "", "");
	} else if (inRange(d100, 75, 76)) {
		lootFormula = createFormulaObject("2d4*25", "1d1", "Magic Item Table D", "", "");
	} else if (inRange(d100, 77, 78)) {
		lootFormula = createFormulaObject("3d6*50", "1d1", "Magic Item Table D", "", "");
	} else if (inRange(d100, 79, 79)) {
		lootFormula = createFormulaObject("3d6*100", "1d1", "Magic Item Table D", "", "");
	} else if (inRange(d100, 80, 80)) {
		lootFormula = createFormulaObject("2d4*250", "1d1", "Magic Item Table D", "", "");
	} else if (inRange(d100, 81, 84)) {
		lootFormula = createFormulaObject("2d4*25", "1d4", "Magic Item Table F", "", "");
	} else if (inRange(d100, 85, 88)) {
		lootFormula = createFormulaObject("3d6*50", "1d4", "Magic Item Table F", "", "");
	} else if (inRange(d100, 89, 91)) {
		lootFormula = createFormulaObject("3d6*100", "1d4", "Magic Item Table F", "", "");
	} else if (inRange(d100, 92, 94)) {
		lootFormula = createFormulaObject("2d4*250", "1d4", "Magic Item Table F", "", "");
	} else if (inRange(d100, 95, 96)) {
		lootFormula = createFormulaObject("3d6*100", "1d4", "Magic Item Table G", "", "");
	} else if (inRange(d100, 97, 98)) {
		lootFormula = createFormulaObject("2d4*250", "1d6", "Magic Item Table G", "", "");
	} else if (inRange(d100, 99, 99)) {
		lootFormula = createFormulaObject("3d6*100", "1d1", "Magic Item Table H", "", "");
	} else if (inRange(d100, 100, 100)) {
		lootFormula = createFormulaObject("2d4*250", "1d1", "Magic Item Table H", "", "");
	}


	return lootFormula;
}

function CR16LootTable(d100) {
	var lootFormula;

	if (inRange(d100, 1, 3)) {
		lootFormula = createFormulaObject("", "", "", "", "");
	} else if (inRange(d100, 4, 6)) {
		lootFormula = createFormulaObject("2d4*250", "", "", "", "");
	} else if (inRange(d100, 7, 10)) {
		lootFormula = createFormulaObject("2d4*750", "", "", "", "");
	} else if (inRange(d100, 11, 12)) {
		lootFormula = createFormulaObject("3d6*500", "", "", "", "");
	} else if (inRange(d100, 13, 15)) {
		lootFormula = createFormulaObject("3d6*1000", "", "", "", "");
	} else if (inRange(d100, 16, 19)) {
		lootFormula = createFormulaObject("2d4*250", "1d4", "Magic Item Table A", "1d6", "Magic Item Table B");
	} else if (inRange(d100, 20, 23)) {
		lootFormula = createFormulaObject("2d4*750", "1d4", "Magic Item Table A", "1d6", "Magic Item Table B");
	} else if (inRange(d100, 24, 26)) {
		lootFormula = createFormulaObject("3d6*500", "1d4", "Magic Item Table A", "1d6", "Magic Item Table B");
	} else if (inRange(d100, 27, 29)) {
		lootFormula = createFormulaObject("3d6*1000", "1d4", "Magic Item Table A", "1d6", "Magic Item Table B");
	} else if (inRange(d100, 30, 35)) {
		lootFormula = createFormulaObject("2d4*250", "1d6", "Magic Item Table C", "", "");
	} else if (inRange(d100, 36, 40)) {
		lootFormula = createFormulaObject("2d4*750", "1d6", "Magic Item Table C", "", "");
	} else if (inRange(d100, 41, 45)) {
		lootFormula = createFormulaObject("3d6*500", "1d6", "Magic Item Table C", "", "");
	} else if (inRange(d100, 46, 50)) {
		lootFormula = createFormulaObject("3d6*1000", "1d6", "Magic Item Table C", "", "");
	} else if (inRange(d100, 51, 54)) {
		lootFormula = createFormulaObject("2d4*250", "1d4", "Magic Item Table D", "", "");
	} else if (inRange(d100, 55, 58)) {
		lootFormula = createFormulaObject("2d4*750", "1d4", "Magic Item Table D", "", "");
	} else if (inRange(d100, 59, 62)) {
		lootFormula = createFormulaObject("3d6*500", "1d4", "Magic Item Table D", "", "");
	} else if (inRange(d100, 63, 66)) {
		lootFormula = createFormulaObject("3d6*1000", "1d4", "Magic Item Table D", "", "");
	} else if (inRange(d100, 67, 68)) {
		lootFormula = createFormulaObject("2d4*250", "1d1", "Magic Item Table E", "", "");
	} else if (inRange(d100, 69, 70)) {
		lootFormula = createFormulaObject("2d4*750", "1d1", "Magic Item Table E", "", "");
	} else if (inRange(d100, 71, 72)) {
		lootFormula = createFormulaObject("3d6*500", "1d1", "Magic Item Table E", "", "");
	} else if (inRange(d100, 73, 74)) {
		lootFormula = createFormulaObject("3d6*1000", "1d1", "Magic Item Table E", "", "");
	} else if (inRange(d100, 75, 76)) {
		lootFormula = createFormulaObject("2d4*250", "1d1", "Magic Item Table F", "1d4", "Magic Item Table G");
	} else if (inRange(d100, 77, 78)) {
		lootFormula = createFormulaObject("2d4*750", "1d1", "Magic Item Table F", "1d4", "Magic Item Table G");
	} else if (inRange(d100, 79, 80)) {
		lootFormula = createFormulaObject("3d6*500", "1d1", "Magic Item Table F", "1d4", "Magic Item Table G");
	} else if (inRange(d100, 81, 82)) {
		lootFormula = createFormulaObject("3d6*1000", "1d1", "Magic Item Table F", "1d4", "Magic Item Table G");
	} else if (inRange(d100, 83, 85)) {
		lootFormula = createFormulaObject("2d4*250", "1d4", "Magic Item Table H", "", "");
	} else if (inRange(d100, 86, 88)) {
		lootFormula = createFormulaObject("2d4*750", "1d4", "Magic Item Table H", "", "");
	} else if (inRange(d100, 89, 90)) {
		lootFormula = createFormulaObject("3d6*500", "1d4", "Magic Item Table H", "", "");
	} else if (inRange(d100, 91, 92)) {
		lootFormula = createFormulaObject("3d6*1000", "1d4", "Magic Item Table H", "", "");
	} else if (inRange(d100, 93, 94)) {
		lootFormula = createFormulaObject("2d4*250", "1d1", "Magic Item Table I", "", "");
	} else if (inRange(d100, 95, 96)) {
		lootFormula = createFormulaObject("3d6*500", "1d1", "Magic Item Table I", "", "");
	} else if (inRange(d100, 97, 98)) {
		lootFormula = createFormulaObject("3d6*1000", "1d1", "Magic Item Table I", "", "");
	} else if (inRange(d100, 99, 100)) {
		lootFormula = createFormulaObject("3d6*1000", "1d1", "Magic Item Table I", "", "");
	}


	return lootFormula;
}

function CR17LootTable(d100) {
	var lootFormula;

	if (inRange(d100, 1, 2)) {
		lootFormula = createFormulaObject("", "", "", "", "");
	} else if (inRange(d100, 3, 5)) {
		lootFormula = createFormulaObject("3d6*1000", "1d8", "Magic Item Table C", "", "");
	} else if (inRange(d100, 6, 8)) {
		lootFormula = createFormulaObject("1d10*2500", "1d8", "Magic Item Table C", "", "");
	} else if (inRange(d100, 9, 11)) {
		lootFormula = createFormulaObject("1d4*7500", "1d8", "Magic Item Table C", "", "");
	} else if (inRange(d100, 12, 14)) {
		lootFormula = createFormulaObject("1d8*5000", "1d8", "Magic Item Table C", "", "");
	} else if (inRange(d100, 15, 22)) {
		lootFormula = createFormulaObject("3d6*1000", "1d6", "Magic Item Table D", "", "");
	} else if (inRange(d100, 23, 30)) {
		lootFormula = createFormulaObject("1d10*2500", "1d6", "Magic Item Table D", "", "");
	} else if (inRange(d100, 31, 38)) {
		lootFormula = createFormulaObject("1d4*7500", "1d6", "Magic Item Table D", "", "");
	} else if (inRange(d100, 39, 46)) {
		lootFormula = createFormulaObject("1d8*5000", "1d6", "Magic Item Table D", "", "");
	} else if (inRange(d100, 47, 52)) {
		lootFormula = createFormulaObject("3d6*1000", "1d6", "Magic Item Table E", "", "");
	} else if (inRange(d100, 53, 58)) {
		lootFormula = createFormulaObject("1d10*2500", "1d6", "Magic Item Table E", "", "");
	} else if (inRange(d100, 59, 63)) {
		lootFormula = createFormulaObject("1d4*7500", "1d6", "Magic Item Table E", "", "");
	} else if (inRange(d100, 64, 68)) {
		lootFormula = createFormulaObject("1d8*5000", "1d6", "Magic Item Table E", "", "");
	} else if (inRange(d100, 69, 69)) {
		lootFormula = createFormulaObject("3d6*1000", "1d4", "Magic Item Table G", "", "");
	} else if (inRange(d100, 70, 70)) {
		lootFormula = createFormulaObject("1d10*2500", "1d4", "Magic Item Table G", "", "");
	} else if (inRange(d100, 71, 71)) {
		lootFormula = createFormulaObject("1d4*7500", "1d4", "Magic Item Table G", "", "");
	} else if (inRange(d100, 72, 72)) {
		lootFormula = createFormulaObject("1d8*5000", "1d4", "Magic Item Table G", "", "");
	} else if (inRange(d100, 73, 74)) {
		lootFormula = createFormulaObject("3d6*1000", "1d4", "Magic Item Table H", "", "");
	} else if (inRange(d100, 75, 76)) {
		lootFormula = createFormulaObject("ld10*2500", "1d4", "Magic Item Table H", "", "");
	} else if (inRange(d100, 77, 78)) {
		lootFormula = createFormulaObject("1d4*7500", "1d4", "Magic Item Table H", "", "");
	} else if (inRange(d100, 79, 80)) {
		lootFormula = createFormulaObject("1d8*5000", "1d4", "Magic Item Table H", "", "");
	} else if (inRange(d100, 81, 85)) {
		lootFormula = createFormulaObject("3d6*1000", "1d4", "Magic Item Table I", "", "");
	} else if (inRange(d100, 86, 90)) {
		lootFormula = createFormulaObject("1d10*2500", "1d4", "Magic Item Table I", "", "");
	} else if (inRange(d100, 91, 95)) {
		lootFormula = createFormulaObject("1d4*7500", "1d1", "Magic Item Table F", "1d4", "Magic Item Table G");
	} else if (inRange(d100, 96, 100)) {
		lootFormula = createFormulaObject("1d8*5000", "1d4", "Magic Item Table I", "", "");
	}

	return lootFormula;
}
function GetMagicItems(LootFormula) {
	var magicItems = [];


	//Get Magic Items for Table #1
	var magicItem1Dice = rollAndCombineDice(LootFormula.MagicItemDice);
	var table1 = GetMagicItemTable(LootFormula.MagicItemTable);
	magicItems = AddItemsToArray(magicItem1Dice, table1, magicItems);

	//Get Magic Items for Table #2
	var magicItem2Dice = rollAndCombineDice(LootFormula.MagicItemDice2);
	var table2 = GetMagicItemTable(LootFormula.MagicItemTable2);
	magicItems = AddItemsToArray(magicItem2Dice, table2, magicItems);

	return magicItems;
}


function GetMagicItemTable(tableString) {

	var table = [];

	if (tableString == "Magic Item Table A") {
		table = MagicTableA;
	} else if (tableString == "Magic Item Table B") {
		table = MagicTableB;
	} else if (tableString == "Magic Item Table C") {
		table = MagicTableC;
	} else if (tableString == "Magic Item Table D") {
		table = MagicTableD;
	} else if (tableString == "Magic Item Table E") {
		table = MagicTableE;
	} else if (tableString == "Magic Item Table F") {
		table = MagicTableF;
	} else if (tableString == "Magic Item Table G") {
		table = MagicTableG;
	} else if (tableString == "Magic Item Table H") {
		table = MagicTableH;
	} else if (tableString == "Magic Item Table I") {
		table = MagicTableI;
	}

	return table;

}

function AddItemsToArray(dice, table, array) {

	var item;

	for (i = 0; i < dice; i++) {

		item = table(getRandomArbitrary(100));

		if (array.includes(item) == true) {
			item = table(getRandomArbitrary(100));
		}

		array.push(item);


	}

	return array;

}

function MagicTableA(d100) {

	var magicItem;

	if (inRange(d100, 1, 50)) {
		magicItem = "Potion of healing";
	} else if (inRange(d100, 51, 60)) {
		magicItem = getRandomSpellScroll(0);
	} else if (inRange(d100, 61, 70)) {
		magicItem = "Potion of climbing";
	} else if (inRange(d100, 71, 90)) {
		magicItem = getRandomSpellScroll(1);
	} else if (inRange(d100, 91, 94)) {
		magicItem = getRandomSpellScroll(2);
	} else if (inRange(d100, 95, 98)) {
		magicItem = "Greater potion of healing";
	} else if (inRange(d100, 99, 99)) {
		magicItem = "Bag of holding";
	} else if (inRange(d100, 100, 100)) {
		magicItem = "Driftglobe";
	}

	return magicItem;
}

function MagicTableB(d100) {

	var magicItem;

	if (inRange(d100, 1, 15)) {
		magicItem = "Potion of greater healing";
	} else if (inRange(d100, 16, 22)) {
		magicItem = "Potion of fire breath";
	} else if (inRange(d100, 23, 29)) {
		magicItem = "Potion of resistance";
	} else if (inRange(d100, 30, 34)) {
		magicItem = "Ammunition, +1";
	} else if (inRange(d100, 35, 39)) {
		magicItem = "Potion of animal friendship";
	} else if (inRange(d100, 40, 44)) {
		magicItem = "Potion of hill giant strength";
	} else if (inRange(d100, 45, 49)) {
		magicItem = "Potion of growth";
	} else if (inRange(d100, 50, 54)) {
		magicItem = "Potion of water breathing";
	} else if (inRange(d100, 55, 59)) {
		magicItem = getRandomSpellScroll(2);
	} else if (inRange(d100, 60, 64)) {
		magicItem = getRandomSpellScroll(3);
	} else if (inRange(d100, 65, 67)) {
		magicItem = "Bag of holding";
	} else if (inRange(d100, 68, 70)) {
		magicItem = "Keoghtom's ointment";
	} else if (inRange(d100, 71, 73)) {
		magicItem = "Oil of slipperiness";
	} else if (inRange(d100, 74, 75)) {
		magicItem = "Dust of disappearance";
	} else if (inRange(d100, 76, 77)) {
		magicItem = "Dust of dryness";
	} else if (inRange(d100, 78, 79)) {
		magicItem = "Dust of sneezing and choking";
	} else if (inRange(d100, 80, 81)) {
		magicItem = "Elemental gem";
	} else if (inRange(d100, 82, 83)) {
		magicItem = "Philter of love";
	} else if (inRange(d100, 84, 84)) {
		magicItem = "Alchemy jug";
	} else if (inRange(d100, 85, 85)) {
		magicItem = "Cap of water breathing";
	} else if (inRange(d100, 86, 86)) {
		magicItem = "Cloak of the manta ray";
	} else if (inRange(d100, 87, 87)) {
		magicItem = "Driftglobe";
	} else if (inRange(d100, 88, 88)) {
		magicItem = "Goggles of night";
	} else if (inRange(d100, 89, 89)) {
		magicItem = "Helm of comprehending languages";
	} else if (inRange(d100, 90, 90)) {
		magicItem = "Immovable rod";
	} else if (inRange(d100, 91, 91)) {
		magicItem = "Lantern of revealing";
	} else if (inRange(d100, 92, 92)) {
		magicItem = "Mariner's armor";
	} else if (inRange(d100, 93, 93)) {
		magicItem = "Mithral armor";
	} else if (inRange(d100, 94, 94)) {
		magicItem = "Potion of poison";
	} else if (inRange(d100, 95, 95)) {
		magicItem = "Ring of swimming";
	} else if (inRange(d100, 96, 96)) {
		magicItem = "Robe of useful items";
	} else if (inRange(d100, 97, 97)) {
		magicItem = "Rope of climbing";
	} else if (inRange(d100, 98, 98)) {
		magicItem = "Saddle of the cavalier";
	} else if (inRange(d100, 99, 99)) {
		magicItem = "Wand of magic detection";
	} else if (inRange(d100, 100, 100)) {
		magicItem = "Wand of secrets";
	}

	return magicItem;
}

function MagicTableC(d100) {

	var magicItem;

	if (inRange(d100, 1, 15)) {
		magicItem = "Potion of superior healing";
	} else if (inRange(d100, 16, 22)) {
		magicItem = getRandomSpellScroll(4);
	} else if (inRange(d100, 23, 27)) {
		magicItem = "Ammunition, +2";
	} else if (inRange(d100, 28, 32)) {
		magicItem = "Potion of clairvoyance";
	} else if (inRange(d100, 33, 37)) {
		magicItem = "Potion of diminution";
	} else if (inRange(d100, 38, 42)) {
		magicItem = "Potion of gaseous form";
	} else if (inRange(d100, 43, 47)) {
		magicItem = "Potion of frost giant strength";
	} else if (inRange(d100, 48, 52)) {
		magicItem = "Potion of stone giant strength";
	} else if (inRange(d100, 53, 57)) {
		magicItem = "Potion of heroism";
	} else if (inRange(d100, 58, 62)) {
		magicItem = "Potion of invulnerability";
	} else if (inRange(d100, 63, 67)) {
		magicItem = "Potion of mind reading";
	} else if (inRange(d100, 68, 72)) {
		magicItem = getRandomSpellScroll(5);
	} else if (inRange(d100, 73, 75)) {
		magicItem = "Elixir of health";
	} else if (inRange(d100, 76, 78)) {
		magicItem = "Oil of etherealness";
	} else if (inRange(d100, 79, 81)) {
		magicItem = "Potion of fire giant strength";
	} else if (inRange(d100, 82, 84)) {
		magicItem = "Quaal's feather token";
	} else if (inRange(d100, 85, 87)) {
		magicItem = "Scroll of protection";
	} else if (inRange(d100, 88, 89)) {
		magicItem = "Bag of beans";
	} else if (inRange(d100, 90, 91)) {
		magicItem = "Bead of force";
	} else if (inRange(d100, 92, 92)) {
		magicItem = "Chime of opening";
	} else if (inRange(d100, 93, 93)) {
		magicItem = "Decanter of endless water";
	} else if (inRange(d100, 94, 94)) {
		magicItem = "Eyes of minute seeing";
	} else if (inRange(d100, 95, 95)) {
		magicItem = "Folding boat";
	} else if (inRange(d100, 96, 96)) {
		magicItem = "Heward's handy haversack";
	} else if (inRange(d100, 97, 97)) {
		magicItem = "Horseshoes of speed";
	} else if (inRange(d100, 98, 98)) {
		magicItem = "Necklace of fireballs";
	} else if (inRange(d100, 99, 99)) {
		magicItem = "Periapt of health";
	} else if (inRange(d100, 100, 100)) {
		magicItem = "Sending Stones";
	}

	return magicItem;
}

function MagicTableD(d100) {

	var magicItem;

	if (inRange(d100, 1, 20)) {
		magicItem = "Potion of supreme healing";
	} else if (inRange(d100, 21, 30)) {
		magicItem = "Potion of invisibility";
	} else if (inRange(d100, 31, 40)) {
		magicItem = "Potion of speed";
	} else if (inRange(d100, 41, 50)) {
		magicItem = getRandomSpellScroll(6);
	} else if (inRange(d100, 51, 57)) {
		magicItem = getRandomSpellScroll(7);
	} else if (inRange(d100, 58, 62)) {
		magicItem = "Ammunition, +3";
	} else if (inRange(d100, 63, 67)) {
		magicItem = "Oil of sharpness";
	} else if (inRange(d100, 68, 72)) {
		magicItem = "Potion of flying";
	} else if (inRange(d100, 73, 77)) {
		magicItem = "Potion of cloud giant strength";
	} else if (inRange(d100, 78, 82)) {
		magicItem = "Potion of longevity";
	} else if (inRange(d100, 83, 87)) {
		magicItem = "Potion of vitality";
	} else if (inRange(d100, 88, 92)) {
		magicItem = getRandomSpellScroll(8);
	} else if (inRange(d100, 93, 95)) {
		magicItem = "Horseshoes of a zephyr";
	} else if (inRange(d100, 96, 98)) {
		magicItem = "Nolzur's marvelous pigments";
	} else if (inRange(d100, 99, 99)) {
		magicItem = "Bag of devouring";
	} else if (inRange(d100, 100, 100)) {
		magicItem = "Portable hole";
	}

	return magicItem;
}

function MagicTableE(d100) {

	var magicItem;

	if (inRange(d100, 1, 30)) {
		magicItem = getRandomSpellScroll(8);
	} else if (inRange(d100, 31, 55)) {
		magicItem = "Potion of storm giant strength";
	} else if (inRange(d100, 56, 70)) {
		magicItem = "Potion of supreme healing";
	} else if (inRange(d100, 71, 85)) {
		magicItem = getRandomSpellScroll(9);
	} else if (inRange(d100, 86, 93)) {
		magicItem = "Universal solvent";
	} else if (inRange(d100, 94, 98)) {
		magicItem = "Arrow of slaying";
	} else if (inRange(d100, 99, 100)) {
		magicItem = "Sovereign glue";
	}

	return magicItem;
}

function MagicTableF(d100) {

	var magicItem;

	if (inRange(d100, 1, 15)) {
		magicItem = "[" + getRandomWeapon() + "]+1";
	} else if (inRange(d100, 16, 18)) {
		magicItem = "Shield,+ 1";
	} else if (inRange(d100, 19, 21)) {
		magicItem = "Sentinel shield";
	} else if (inRange(d100, 22, 23)) {
		magicItem = "Amulet of proof against detection and location";
	} else if (inRange(d100, 24, 25)) {
		magicItem = "Boots of elvenkind";
	} else if (inRange(d100, 26, 27)) {
		magicItem = "Boots of striding and springing";
	} else if (inRange(d100, 27, 29)) {
		magicItem = "Bracers of archery";
	} else if (inRange(d100, 30, 31)) {
		magicItem = "Brooch of shielding";
	} else if (inRange(d100, 32, 33)) {
		magicItem = "Broom of flying";
	} else if (inRange(d100, 34, 35)) {
		magicItem = "Cloak of elvenkind";
	} else if (inRange(d100, 36, 37)) {
		magicItem = "Cloak of protection";
	} else if (inRange(d100, 38, 39)) {
		magicItem = "Gauntlets of ogre power";
	} else if (inRange(d100, 40, 41)) {
		magicItem = "Hat of disguise";
	} else if (inRange(d100, 42, 43)) {
		magicItem = "Javelin of lightning";
	} else if (inRange(d100, 44, 45)) {
		magicItem = "Pearl of power";
	} else if (inRange(d100, 46, 47)) {
		magicItem = "Rod of the pact keeper, + 1";
	} else if (inRange(d100, 48, 49)) {
		magicItem = "Slippers of spider climbing";
	} else if (inRange(d100, 50, 51)) {
		magicItem = "Staff of the adder";
	} else if (inRange(d100, 52, 53)) {
		magicItem = "Staff of the python";
	} else if (inRange(d100, 54, 55)) {
		magicItem = "Sword of vengeance";
	} else if (inRange(d100, 56, 57)) {
		magicItem = "Trident of fish command";
	} else if (inRange(d100, 58, 59)) {
		magicItem = "Wand of magic missiles";
	} else if (inRange(d100, 60, 61)) {
		magicItem = "Wand of the war mage, + 1";
	} else if (inRange(d100, 62, 63)) {
		magicItem = "Wand of web";
	} else if (inRange(d100, 64, 65)) {
		magicItem = "Weapon of warning";
	} else if (inRange(d100, 66, 66)) {
		magicItem = "Adamantine armor (chain mail)";
	} else if (inRange(d100, 67, 67)) {
		magicItem = "Adamantine armor (chain shirt)";
	} else if (inRange(d100, 68, 68)) {
		magicItem = "Adamantine armor (scale mail)";
	} else if (inRange(d100, 69, 69)) {
		magicItem = "Bag of tricks (gray)";
	} else if (inRange(d100, 70, 70)) {
		magicItem = "Bag of tricks (rust)";
	} else if (inRange(d100, 71, 71)) {
		magicItem = "Bag of tricks (tan)";
	} else if (inRange(d100, 72, 72)) {
		magicItem = "Boots of the winterlands";
	} else if (inRange(d100, 73, 73)) {
		magicItem = "Circlet of blasting";
	} else if (inRange(d100, 74, 74)) {
		magicItem = "Deck of illusions";
	} else if (inRange(d100, 75, 75)) {
		magicItem = "Eversmoking bottle";
	} else if (inRange(d100, 76, 76)) {
		magicItem = "Eyes of charming";
	} else if (inRange(d100, 77, 77)) {
		magicItem = "Eyes of the eagle";
	} else if (inRange(d100, 78, 78)) {
		magicItem = "Figurine of wondrous power (silver raven)";
	} else if (inRange(d100, 79, 79)) {
		magicItem = "Gem of brightness";
	} else if (inRange(d100, 80, 80)) {
		magicItem = "Gloves of missile snaring";
	} else if (inRange(d100, 81, 81)) {
		magicItem = "Gloves of swimming and climbing";
	} else if (inRange(d100, 82, 82)) {
		magicItem = "Gloves of thievery";
	} else if (inRange(d100, 83, 83)) {
		magicItem = "Headband of intellect";
	} else if (inRange(d100, 84, 84)) {
		magicItem = "Helm of telepathy";
	} else if (inRange(d100, 85, 85)) {
		magicItem = "Instrument of the bards (Doss lute)";
	} else if (inRange(d100, 86, 86)) {
		magicItem = "Instrument of the bards (Fochlucan bandore)";
	} else if (inRange(d100, 87, 87)) {
		magicItem = "Instrument of the bards (Mac-Fuimidh cittern)";
	} else if (inRange(d100, 88, 88)) {
		magicItem = "Medallion of thoughts";
	} else if (inRange(d100, 89, 89)) {
		magicItem = "Necklace of adaptation";
	} else if (inRange(d100, 90, 90)) {
		magicItem = "Periapt of wound closure";
	} else if (inRange(d100, 91, 91)) {
		magicItem = "Pipes of haunting";
	} else if (inRange(d100, 92, 92)) {
		magicItem = "Pipes of the sewers";
	} else if (inRange(d100, 93, 93)) {
		magicItem = "Ring of jumping";
	} else if (inRange(d100, 94, 94)) {
		magicItem = "Ring of mind shielding";
	} else if (inRange(d100, 95, 95)) {
		magicItem = "Ring of warmth";
	} else if (inRange(d100, 96, 96)) {
		magicItem = "Ring of water walking";
	} else if (inRange(d100, 97, 97)) {
		magicItem = "Quiver of Ehlonna";
	} else if (inRange(d100, 98, 98)) {
		magicItem = "Stone of good luck";
	} else if (inRange(d100, 99, 99)) {
		magicItem = "Wind fan";
	} else if (inRange(d100, 100, 100)) {
		magicItem = "Winged boots";
	}

	return magicItem;
}

function MagicTableG(d100) {

	var magicItem;

	if (inRange(d100, 1, 11)) {
		magicItem = "[" + getRandomWeapon() + "]+2";
	} else if (inRange(d100, 12, 14)) {
		magicItem = "Figurine of Wondrous Power [" + FigurineOfWondrousPower() + "]";
	} else if (inRange(d100, 15, 15)) {
		magicItem = "Adamantine armor (breastplate)";
	} else if (inRange(d100, 16, 16)) {
		magicItem = "Adamantine armor (splint)";
	} else if (inRange(d100, 17, 17)) {
		magicItem = "Amulet of health";
	} else if (inRange(d100, 18, 18)) {
		magicItem = "Armor of vulnerability";
	} else if (inRange(d100, 19, 19)) {
		magicItem = "Arrow-catching shield";
	} else if (inRange(d100, 20, 20)) {
		magicItem = "Belt of dwarvenkind";
	} else if (inRange(d100, 21, 21)) {
		magicItem = "Belt of hill giant strength";
	} else if (inRange(d100, 22, 22)) {
		magicItem = "Berserker axe";
	} else if (inRange(d100, 23, 23)) {
		magicItem = "Boots of levitation";
	} else if (inRange(d100, 24, 24)) {
		magicItem = "Boots of speed";
	} else if (inRange(d100, 25, 25)) {
		magicItem = "Bowl of commanding water elementals";
	} else if (inRange(d100, 26, 26)) {
		magicItem = "Bracers of defense";
	} else if (inRange(d100, 27, 27)) {
		magicItem = "Brazier of commanding fire elementals";
	} else if (inRange(d100, 28, 28)) {
		magicItem = "Cape of the mountebank";
	} else if (inRange(d100, 29, 29)) {
		magicItem = "Censer of controlling air elementals";
	} else if (inRange(d100, 30, 30)) {
		magicItem = "Armor, +1 chain mail";
	} else if (inRange(d100, 31, 31)) {
		magicItem = "Armor of resistance (chain mail)";
	} else if (inRange(d100, 32, 32)) {
		magicItem = "Armor of resistance (chain shirt)";
	} else if (inRange(d100, 33, 33)) {
		magicItem = "Armor,+ 1 chain shirt";
	} else if (inRange(d100, 34, 34)) {
		magicItem = "Cloak of displacement";
	} else if (inRange(d100, 35, 35)) {
		magicItem = "Cloak of the bat";
	} else if (inRange(d100, 36, 36)) {
		magicItem = "Cube of force";
	} else if (inRange(d100, 37, 37)) {
		magicItem = "Daern's instant fortress";
	} else if (inRange(d100, 38, 38)) {
		magicItem = "Dagger of venom";
	} else if (inRange(d100, 39, 39)) {
		magicItem = "Dimensional shackles";
	} else if (inRange(d100, 40, 40)) {
		magicItem = "Dragon slayer";
	} else if (inRange(d100, 41, 41)) {
		magicItem = "Elven chain";
	} else if (inRange(d100, 42, 42)) {
		magicItem = "Flame tongue";
	} else if (inRange(d100, 43, 43)) {
		magicItem = "Gem of seeing";
	} else if (inRange(d100, 44, 44)) {
		magicItem = "Giant slayer";
	} else if (inRange(d100, 45, 45)) {
		magicItem = "Clamoured studded leather";
	} else if (inRange(d100, 46, 46)) {
		magicItem = "Helm of teleportation";
	} else if (inRange(d100, 47, 47)) {
		magicItem = "Horn of blasting";
	} else if (inRange(d100, 48, 48)) {
		magicItem = "Horn of Valhalla (silver or brass)";
	} else if (inRange(d100, 49, 49)) {
		magicItem = "Instrument of the bards (Canaithmandolin)";
	} else if (inRange(d100, 50, 50)) {
		magicItem = "Instrument ofthe bards (Cii lyre)";
	} else if (inRange(d100, 51, 51)) {
		magicItem = "loun stone (awareness)";
	} else if (inRange(d100, 52, 52)) {
		magicItem = "loun stone (protection)";
	} else if (inRange(d100, 53, 53)) {
		magicItem = "loun stone (reserve)";
	} else if (inRange(d100, 54, 54)) {
		magicItem = "loun stone (sustenance)";
	} else if (inRange(d100, 55, 55)) {
		magicItem = "Iron bands of Bilarro";
	} else if (inRange(d100, 56, 56)) {
		magicItem = "Armor, + 1 leather";
	} else if (inRange(d100, 57, 57)) {
		magicItem = "Armor of resistance (leather)";
	} else if (inRange(d100, 58, 58)) {
		magicItem = "Mace of disruption";
	} else if (inRange(d100, 59, 59)) {
		magicItem = "Mace of smiting";
	} else if (inRange(d100, 60, 60)) {
		magicItem = "Mace of terror";
	} else if (inRange(d100, 61, 61)) {
		magicItem = "Mantle of spell resistance";
	} else if (inRange(d100, 62, 62)) {
		magicItem = "Necklace of prayer beads";
	} else if (inRange(d100, 63, 63)) {
		magicItem = "Periapt of proof against poison";
	} else if (inRange(d100, 64, 64)) {
		magicItem = "Ring of animal influence";
	} else if (inRange(d100, 65, 65)) {
		magicItem = "Ring of evasion";
	} else if (inRange(d100, 66, 66)) {
		magicItem = "Ring of feather falling";
	} else if (inRange(d100, 67, 67)) {
		magicItem = "Ring of free action";
	} else if (inRange(d100, 68, 68)) {
		magicItem = "Ring of protection";
	} else if (inRange(d100, 69, 69)) {
		magicItem = "Ring of resistance";
	} else if (inRange(d100, 70, 70)) {
		magicItem = "Ring of spell storing";
	} else if (inRange(d100, 71, 71)) {
		magicItem = "Ring of the ram";
	} else if (inRange(d100, 72, 72)) {
		magicItem = "Ring of X-ray vision";
	} else if (inRange(d100, 73, 73)) {
		magicItem = "Robe of eyes";
	} else if (inRange(d100, 74, 74)) {
		magicItem = "Rod of rulership";
	} else if (inRange(d100, 75, 75)) {
		magicItem = "Rod of the pact keeper, +2";
	} else if (inRange(d100, 76, 76)) {
		magicItem = "Rope of entanglement";
	} else if (inRange(d100, 77, 77)) {
		magicItem = "Armor, +1 scale mail";
	} else if (inRange(d100, 78, 78)) {
		magicItem = "Armor of resistance (scale mail)";
	} else if (inRange(d100, 79, 79)) {
		magicItem = "Shield, +2";
	} else if (inRange(d100, 80, 80)) {
		magicItem = "Shield of missile attraction";
	} else if (inRange(d100, 81, 81)) {
		magicItem = "Staff of charming";
	} else if (inRange(d100, 82, 82)) {
		magicItem = "Staff of healing";
	} else if (inRange(d100, 83, 83)) {
		magicItem = "Staff of swarming insects";
	} else if (inRange(d100, 84, 84)) {
		magicItem = "Staff of the woodlands";
	} else if (inRange(d100, 85, 85)) {
		magicItem = "Staff of withering";
	} else if (inRange(d100, 86, 86)) {
		magicItem = "Stone of controlling earth elementals";
	} else if (inRange(d100, 87, 87)) {
		magicItem = "Sun blade";
	} else if (inRange(d100, 88, 88)) {
		magicItem = "Sword of life stealing";
	} else if (inRange(d100, 89, 89)) {
		magicItem = "Sword of wounding";
	} else if (inRange(d100, 90, 90)) {
		magicItem = "Tentacle rod";
	} else if (inRange(d100, 91, 91)) {
		magicItem = "Vicious weapon";
	} else if (inRange(d100, 92, 92)) {
		magicItem = "Wand of binding";
	} else if (inRange(d100, 93, 93)) {
		magicItem = "Wand of enemy detection";
	} else if (inRange(d100, 94, 94)) {
		magicItem = "Wand of fear";
	} else if (inRange(d100, 95, 95)) {
		magicItem = "Wand of fireballs";
	} else if (inRange(d100, 96, 96)) {
		magicItem = "Wand of lightning bolts";
	} else if (inRange(d100, 97, 97)) {
		magicItem = "Wand of paralysis";
	} else if (inRange(d100, 98, 98)) {
		magicItem = "Wand of the war mage, +2";
	} else if (inRange(d100, 99, 99)) {
		magicItem = "Wand of wonder";
	} else if (inRange(d100, 100, 100)) {
		magicItem = "Wings of flying";
	}

	return magicItem;
}

function FigurineOfWondrousPower() {

	var Figurines = [
		"NULL",
		"Bronze griffon",
		"Ebony fly",
		"Golden lions",
		"Ivory goats",
		"Marble elephant",
		"Onyx dog",
		"Onyx dog",
		"Serpentine owl"
	];

	return Figurines[getRandomArbitrary(8)];
}

function MagicTableH(d100) {

	var magicItem;

	if (inRange(d100, 1, 10)) {
		magicItem = "[" + getRandomWeapon() + "]+3";
	} else if (inRange(d100, 11, 12)) {
		magicItem = "Amulet of the planes";
	} else if (inRange(d100, 13, 14)) {
		magicItem = "Carpet of flying";
	} else if (inRange(d100, 15, 16)) {
		magicItem = "Crystal ball (very rare version)";
	} else if (inRange(d100, 17, 18)) {
		magicItem = "Ring of regeneration";
	} else if (inRange(d100, 19, 20)) {
		magicItem = "Ring of shooting stars";
	} else if (inRange(d100, 21, 22)) {
		magicItem = "Ring of telekinesis";
	} else if (inRange(d100, 23, 24)) {
		magicItem = "Robe of scintillating colors";
	} else if (inRange(d100, 25, 26)) {
		magicItem = "Robe of stars";
	} else if (inRange(d100, 27, 28)) {
		magicItem = "Rod of absorption";
	} else if (inRange(d100, 29, 30)) {
		magicItem = "Rod of alertness";
	} else if (inRange(d100, 31, 32)) {
		magicItem = "Rod of security";
	} else if (inRange(d100, 33, 34)) {
		magicItem = "Rod of the pact keeper, +3";
	} else if (inRange(d100, 35, 36)) {
		magicItem = "Scimitar of speed";
	} else if (inRange(d100, 37, 38)) {
		magicItem = "Shield, +3";
	} else if (inRange(d100, 39, 40)) {
		magicItem = "Staff of fire";
	} else if (inRange(d100, 41, 42)) {
		magicItem = "Staff of frost";
	} else if (inRange(d100, 43, 44)) {
		magicItem = "Staff of power";
	} else if (inRange(d100, 45, 46)) {
		magicItem = "Staff of striking";
	} else if (inRange(d100, 47, 48)) {
		magicItem = "Staff of thunder and lightning";
	} else if (inRange(d100, 49, 50)) {
		magicItem = "Sword of sharpnes";
	} else if (inRange(d100, 51, 52)) {
		magicItem = "Wand of polymorph";
	} else if (inRange(d100, 53, 54)) {
		magicItem = "Wand of the war mage, + 3";
	} else if (inRange(d100, 55, 55)) {
		magicItem = "Adamantine armor (half plate)";
	} else if (inRange(d100, 56, 56)) {
		magicItem = "Adamantine armor (plate)";
	} else if (inRange(d100, 57, 57)) {
		magicItem = "Animated shield";
	} else if (inRange(d100, 58, 58)) {
		magicItem = "Belt of fire giant strength";
	} else if (inRange(d100, 59, 59)) {
		magicItem = "Belt of frost (or stone) giant strength";
	} else if (inRange(d100, 60, 60)) {
		magicItem = "Armor, + 1 breastplate";
	} else if (inRange(d100, 61, 61)) {
		magicItem = "Armor of resistance (breastplate)";
	} else if (inRange(d100, 62, 62)) {
		magicItem = "Candle of invocation";
	} else if (inRange(d100, 63, 63)) {
		magicItem = "Armor, +2 chain mail";
	} else if (inRange(d100, 64, 64)) {
		magicItem = "Armor, +2 chain shirt";
	} else if (inRange(d100, 65, 65)) {
		magicItem = "Cloak of arachnida";
	} else if (inRange(d100, 66, 66)) {
		magicItem = "Dancing sword";
	} else if (inRange(d100, 67, 67)) {
		magicItem = "Demon armor";
	} else if (inRange(d100, 68, 68)) {
		magicItem = "Dragon scale mail";
	} else if (inRange(d100, 69, 69)) {
		magicItem = "Dwarven plate";
	} else if (inRange(d100, 70, 70)) {
		magicItem = "Dwarven thrower";
	} else if (inRange(d100, 71, 71)) {
		magicItem = "Efreeti bottle";
	} else if (inRange(d100, 72, 72)) {
		magicItem = "Figurine of wondrous power (obsidian steed)";
	} else if (inRange(d100, 73, 73)) {
		magicItem = "Frost brand";
	} else if (inRange(d100, 74, 74)) {
		magicItem = "Helm of brilliance";
	} else if (inRange(d100, 75, 75)) {
		magicItem = "Horn ofValhalla (bronze)";
	} else if (inRange(d100, 76, 76)) {
		magicItem = "Instrument of the bards (Anstruthharp)";
	} else if (inRange(d100, 77, 77)) {
		magicItem = "loun stone (absorption)";
	} else if (inRange(d100, 78, 78)) {
		magicItem = "loun stone (agility)";
	} else if (inRange(d100, 79, 79)) {
		magicItem = "loun stone (fortitude)";
	} else if (inRange(d100, 80, 80)) {
		magicItem = "loun stone (insight)";
	} else if (inRange(d100, 81, 81)) {
		magicItem = "loun stone (intellect)";
	} else if (inRange(d100, 82, 82)) {
		magicItem = "loun stone (leadership)";
	} else if (inRange(d100, 83, 83)) {
		magicItem = "loun stone (strength)";
	} else if (inRange(d100, 84, 84)) {
		magicItem = "Armor, +2 leather";
	} else if (inRange(d100, 85, 85)) {
		magicItem = "Manual of bodily health";
	} else if (inRange(d100, 86, 86)) {
		magicItem = "Manual of gainful exercise";
	} else if (inRange(d100, 87, 87)) {
		magicItem = "Manual of golems";
	} else if (inRange(d100, 88, 88)) {
		magicItem = "Manual of quickness of action";
	} else if (inRange(d100, 89, 89)) {
		magicItem = "Mirror of life trapping";
	} else if (inRange(d100, 90, 90)) {
		magicItem = "Nine lives stealer";
	} else if (inRange(d100, 91, 91)) {
		magicItem = "Oathbow";
	} else if (inRange(d100, 92, 92)) {
		magicItem = "Armor, +2 scale mail";
	} else if (inRange(d100, 93, 93)) {
		magicItem = "Spellguard shield";
	} else if (inRange(d100, 94, 94)) {
		magicItem = "Armor, + 1 splint";
	} else if (inRange(d100, 95, 95)) {
		magicItem = "Armor of resistance (splint)";
	} else if (inRange(d100, 96, 96)) {
		magicItem = "Armor, + 1 studded leather";
	} else if (inRange(d100, 97, 97)) {
		magicItem = "Armor of resistance (studded leather)";
	} else if (inRange(d100, 98, 98)) {
		magicItem = "Tome of clear thought";
	} else if (inRange(d100, 99, 99)) {
		magicItem = "Tome of leadership and influence";
	} else if (inRange(d100, 100, 100)) {
		magicItem = "Tome of understanding";
	}
	return magicItem;
}

function MagicTableI(d100) {

	var magicItem;

	if (inRange(d100, 1, 5)) {
		magicItem = "Defender";
	} else if (inRange(d100, 6, 10)) {
		magicItem = "Hammer of thunderbolts";
	} else if (inRange(d100, 16, 20)) {
		magicItem = "Sword of answering";
	} else if (inRange(d100, 21, 23)) {
		magicItem = "Holy avenger";
	} else if (inRange(d100, 24, 26)) {
		magicItem = "Ring of djinni summoning";
	} else if (inRange(d100, 27, 29)) {
		magicItem = "Ring of invisibility";
	} else if (inRange(d100, 30, 32)) {
		magicItem = "Ring of spell turning";
	} else if (inRange(d100, 36, 38)) {
		magicItem = "Rod of lordly might";
	} else if (inRange(d100, 39, 41)) {
		magicItem = "Vorpal sword";
	} else if (inRange(d100, 42, 43)) {
		magicItem = "Belt of cloud giant strength";
	} else if (inRange(d100, 44, 45)) {
		magicItem = "Armor, +2 breastplate";
	} else if (inRange(d100, 46, 47)) {
		magicItem = "Armor, +3 chain mail";
	} else if (inRange(d100, 48, 49)) {
		magicItem = "Armor, +3 chain shirt";
	} else if (inRange(d100, 50, 51)) {
		magicItem = "Cloak of invisibility";
	} else if (inRange(d100, 52, 53)) {
		magicItem = "Crystal ball (legendary version)";
	} else if (inRange(d100, 54, 55)) {
		magicItem = "Armor, + 1 half plate";
	} else if (inRange(d100, 56, 57)) {
		magicItem = "Iron flask";
	} else if (inRange(d100, 58, 59)) {
		magicItem = "Armor, +3 leather";
	} else if (inRange(d100, 60, 61)) {
		magicItem = "Armor, +1 plate";
	} else if (inRange(d100, 62, 63)) {
		magicItem = "Robe of the archmagi";
	} else if (inRange(d100, 64, 65)) {
		magicItem = "Rod of resurrection";
	} else if (inRange(d100, 66, 67)) {
		magicItem = "Armor, +1 scale mail";
	} else if (inRange(d100, 68, 69)) {
		magicItem = "Scarab of protection";
	} else if (inRange(d100, 70, 71)) {
		magicItem = "Armor, +2 splint";
	} else if (inRange(d100, 72, 73)) {
		magicItem = "Armor, +2 studded leather";
	} else if (inRange(d100, 74, 75)) {
		magicItem = "Well of many worlds";
	} else if (inRange(d100, 76, 76)) {
		magicItem = "Magic armor [" + MagicArmor() + "]";
	} else if (inRange(d100, 77, 77)) {
		magicItem = "Apparatus of Kwalish";
	} else if (inRange(d100, 78, 78)) {
		magicItem = "Armor of invulnerability";
	} else if (inRange(d100, 79, 79)) {
		magicItem = "Belt of storm giant strength";
	} else if (inRange(d100, 80, 80)) {
		magicItem = "Cubic gate";
	} else if (inRange(d100, 81, 81)) {
		magicItem = "Deck of many things";
	} else if (inRange(d100, 82, 82)) {
		magicItem = "Efreeti chain";
	} else if (inRange(d100, 83, 83)) {
		magicItem = "Armor of resistance (half plate)";
	} else if (inRange(d100, 84, 84)) {
		magicItem = "Horn ofValhalla (iron)";
	} else if (inRange(d100, 85, 85)) {
		magicItem = "Instrument of the bards (OIIamh harp)";
	} else if (inRange(d100, 86, 86)) {
		magicItem = "loun stone (greater absorption)";
	} else if (inRange(d100, 87, 87)) {
		magicItem = "loun stone (mastery)";
	} else if (inRange(d100, 88, 88)) {
		magicItem = "loun stone (regeneration)";
	} else if (inRange(d100, 89, 89)) {
		magicItem = "Plate armor of etherealness";
	} else if (inRange(d100, 90, 90)) {
		magicItem = "Plate armor of resistance";
	} else if (inRange(d100, 91, 91)) {
		magicItem = "Ring of air elemental command";
	} else if (inRange(d100, 92, 92)) {
		magicItem = "Ring of earthelemental command";
	} else if (inRange(d100, 93, 93)) {
		magicItem = "Ring of fire elemental command";
	} else if (inRange(d100, 94, 94)) {
		magicItem = "Ring of three wishes";
	} else if (inRange(d100, 95, 95)) {
		magicItem = "Ring of water elemental command";
	} else if (inRange(d100, 96, 96)) {
		magicItem = "Sphere of annihilation";
	} else if (inRange(d100, 97, 97)) {
		magicItem = "Talisman of pure good";
	} else if (inRange(d100, 98, 98)) {
		magicItem = "Talisman of the sphere";
	} else if (inRange(d100, 99, 99)) {
		magicItem = "Talisman of ultimate evil";
	} else if (inRange(d100, 100, 100)) {
		magicItem = "Tome of the stilled tongue";
	}

	return magicItem;
}


function MagicArmor() {

	var Armor = [
		"NULL",
		"+2 Half Plate",
		"+2 Half Plate",
		"+2 Plate",
		"+2 Plate",
		"+3 studded leather",
		"+3 studded leather",
		"+3 breastplate",
		"+3 breastplate",
		"+3 splint",
		"+3 splint",
		"+3 half plate",
		"+3 plate"
	];

	return Armor[getRandomArbitrary(12)];
}

function inRange(x, min, max) {
	return min <= x && x <= max;
}

function rollAndCombineDice(dice) {
	var diceResults = [];
	var dice;
	var diceFormula = dice.split("d").join(",").split("*").join(",").split(",");
	var numberOfDice = diceFormula[0];
	var diceSize = diceFormula[1];
	for (i = 0; i < numberOfDice; i++) {
		diceResults.push(getRandomArbitrary(diceSize));
	}
	var diceTotal = parseInt(diceResults.reduce((a, b) => a + b, 0));
	if (typeof diceFormula[2] === 'undefined') {
		diceFormula[2] = 1
	}
	diceTotal = diceTotal * diceFormula[2];
	return diceTotal;
}

function getRandomArbitrary(max) {
	return Math.floor((Math.random() * max) + 1);
}

function getRandomSpellScroll(spellLevel) {

	var spellTable;

	switch (spellLevel) {
		case 0:spellTable = spellscrolls0;
			break;

		case 1:spellTable = spellscrolls1;
			break;

		case 2:spellTable = spellscrolls2;
			break;

		case 3:spellTable = spellscrolls3;
			break;

		case 4:spellTable = spellscrolls4;
			break;

		case 5:spellTable = spellscrolls5;
			break;

		case 6:spellTable = spellscrolls6;
			break;

		case 7:spellTable = spellscrolls7
			break;

		case 8:spellTable = spellscrolls8;
			break;

		case 9:spellTable = spellscrolls9;
			break;

	}

	var randomSpell = "Spell Scroll of [" + spellTable[Math.floor(Math.random() * spellTable.length)] + "]";

	return randomSpell;

}




var spellscrolls0 = ["Acid Splash",
	"Blade Ward",
	"Booming Blade",
	"Chill Touch",
	"Control Flames",
	"Create Bonfire",
	"Dancing Lights",
	"Druidcraft",
	"Eldritch Blast",
	"Fire Bolt",
	"Friends",
	"Frostbite",
	"Green-Flame Blade",
	"Guidance",
	"Gust",
	"Infestation",
	"Light",
	"Lightning Lure",
	"Mage Hand",
	"Magic Stone",
	"Mending",
	"Message",
	"Minor Illusion",
	"Mold Earth",
	"Poison Spray",
	"Prestidigitation",
	"Primal Savagery",
	"Produce Flame",
	"Ray of Frost",
	"Resistance",
	"Sacred Flame",
	"Shape Water",
	"Shillelagh",
	"Shocking Grasp",
	"Spare the Dying",
	"Sword Burst",
	"Thaumaturgy",
	"Thorn Whip",
	"Thunderclap",
	"Toll the Dead",
	"True Strike",
	"Vicious Mockery",
	"Word of Radiance"
];
var spellscrolls1 = ["Absorb Elements",
	"Alarm",
	"Animal Friendship",
	"Armor of Agathys",
	"Arms of Hadar",
	"Bane",
	"Beast Bond",
	"Bless",
	"Burning Hands",
	"Catapult",
	"Cause Fear",
	"Ceremony",
	"Chaos Bolt",
	"Charm Person",
	"Chromatic Orb",
	"Color Spray",
	"Command",
	"Compelled Duel",
	"Comprehend Languages",
	"Create or Destroy Water",
	"Cure Wounds",
	"Detect Evil and Good",
	"Detect Magic",
	"Detect Poison and Disease",
	"Disguise Self",
	"Dissonant Whispers",
	"Divine Favor",
	"Earth Tremor",
	"Ensnaring Strike",
	"Entangle",
	"Expeditious Retreat",
	"Faerie Fire",
	"False Life",
	"Feather Fall",
	"Find Familiar",
	"Fog Cloud",
	"Goodberry",
	"Grease",
	"Guiding Bolt",
	"Hail of Thorns",
	"Healing Word",
	"Hellish Rebuke",
	"Heroism",
	"Hex",
	"Hunter's Mark",
	"Ice Knife",
	"Identify",
	"Illusory Script",
	"Inflict Wounds",
	"Jump",
	"Longstrider",
	"Mage Armor",
	"Magic Missile",
	"Protection from Evil and Good",
	"Purify Food and Drink",
	"Ray of Sickness",
	"Sanctuary",
	"Searing Smite",
	"Shield",
	"Shield of Faith",
	"Silent Image",
	"Sleep",
	"Snare",
	"Speak with Animals",
	"Tasha's Hideous Laughter",
	"Tenser's Floating Disk",
	"Thunderous Smite",
	"Thunderwave",
	"Unseen Servant",
	"Witch Bolt",
	"Wrathful Smite",
	"Zephyr Strike"
];
var spellscrolls2 = ["Aganazzar's Scorcher",
	"Aid",
	"Alter Self",
	"Animal Messenger",
	"Arcane Lock",
	"Augury",
	"Barkskin",
	"Beast Sense",
	"Blindness/Deafness",
	"Blur",
	"Branding Smite",
	"Calm Emotions",
	"Cloud of Daggers",
	"Continual Flame",
	"Cordon of Arrows",
	"Crown of Madness",
	"Darkness",
	"Darkvision",
	"Detect Thoughts",
	"Dragon's Breath",
	"Dust Devil",
	"Earthbind",
	"Enhance Ability",
	"Enlarge/Reduce",
	"Enthrall",
	"Find Steed",
	"Find Traps",
	"Flame Blade",
	"Flaming Sphere",
	"Gentle Repose",
	"Gust of Wind",
	"Healing Spirit",
	"Heat Metal",
	"Hold Person",
	"Invisibility",
	"Knock",
	"Lesser Restoration",
	"Levitate",
	"Locate Animals or Plants",
	"Locate Object",
	"Magic Mouth",
	"Magic Weapon",
	"Maximilian's Earthen Grasp",
	"Melf's Acid Arrow",
	"Mind Spike",
	"Mirror Image",
	"Misty Step",
	"Moonbeam",
	"Nystul's Magic Aura",
	"Pass without Trace",
	"Phantasmal Force",
	"Prayer of Healing",
	"Protection from Poison",
	"Pyrotechnics",
	"Ray of Enfeeblement",
	"Rope Trick",
	"Scorching Ray",
	"See Invisibility",
	"Shadow Blade",
	"Shatter",
	"Silence",
	"Skywrite",
	"Snilloc's Snowball Swarm",
	"Spider Climb",
	"Spike Growth",
	"Spiritual Weapon",
	"Suggestion",
	"Warding Bond",
	"Warding Wind",
	"Web",
	"Zone of Truth"
];
var spellscrolls3 = ["Animate Dead",
	"Aura of Vitality",
	"Beacon of Hope",
	"Bestow Curse",
	"Blinding Smite",
	"Blink",
	"Call Lightning",
	"Catnap",
	"Clairvoyance",
	"Conjure Animals",
	"Conjure Barrage",
	"Counterspell",
	"Create Food and Water",
	"Crusader's Mantle",
	"Daylight",
	"Dispel Magic",
	"Elemental Weapon",
	"Enemies Abound",
	"Erupting Earth",
	"Fear",
	"Feign Death",
	"Fireball",
	"Flame Arrows",
	"Fly",
	"Gaseous Form",
	"Glyph of Warding",
	"Haste",
	"Hunger of Hadar",
	"Hypnotic Pattern",
	"Leomund's Tiny Hut",
	"Life Transference",
	"Lightning Arrow",
	"Lightning Bolt",
	"Magic Circle",
	"Major Image",
	"Mass Healing Word",
	"Meld into Stone",
	"Melf's Minute Meteors",
	"Nondetection",
	"Phantom Steed",
	"Plant Growth",
	"Protection from Energy",
	"Remove Curse",
	"Revivify",
	"Sending",
	"Sleet Storm",
	"Slow",
	"Speak with Dead",
	"Speak with Plants",
	"Spirit Guardians",
	"Stinking Cloud",
	"Summon Lesser Demons",
	"Thunder Step",
	"Tidal Wave",
	"Tiny Servant",
	"Tongues",
	"Vampiric Touch",
	"Wall of Sand",
	"Wall of Water",
	"Water Breathing",
	"Water Walk",
	"Wind Wall"
];
var spellscrolls4 = ["Arcane Eye",
	"Aura of Life",
	"Aura of Purity",
	"Banishment",
	"Blight",
	"Charm Monster",
	"Compulsion",
	"Confusion",
	"Conjure Minor Elementals",
	"Conjure Woodland Beings",
	"Control Water",
	"Death Ward",
	"Dimension Door",
	"Divination",
	"Dominate Beast",
	"Elemental Bane",
	"Evard's Black Tentacles",
	"Fabricate",
	"Find Greater Steed",
	"Fire Shield",
	"Freedom of Movement",
	"Giant Insect",
	"Grasping Vine",
	"Greater Invisibility",
	"Guardian of Faith",
	"Guardian of Nature",
	"Hallucinatory Terrain",
	"Ice Storm",
	"Leomund's Secret Chest",
	"Locate Creature",
	"Mordenkainen's Faithful Hound",
	"Mordenkainen's Private Sanctum",
	"Otiluke's Resilient Sphere",
	"Phantasmal Killer",
	"Polymorph",
	"Shadow of Moil",
	"Sickening Radiance",
	"Staggering Smite",
	"Stone Shape",
	"Stoneskin",
	"Storm Sphere",
	"Summon Greater Demon",
	"Vitriolic Sphere",
	"Wall of Fire",
	"Watery Sphere"
];
var spellscrolls5 = ["Animate Objects",
	"Antilife Shell",
	"Awaken",
	"Banishing Smite",
	"Bigby's Hand",
	"Circle of Power",
	"Cloudkill",
	"Commune",
	"Commune with Nature",
	"Cone of Cold",
	"Conjure Elemental",
	"Conjure Volley",
	"Contact Other Plane",
	"Contagion",
	"Control Winds",
	"Creation",
	"Danse Macabre",
	"Dawn",
	"Destructive Wave",
	"Dispel Evil and Good",
	"Dominate Person",
	"Dream",
	"Enervation",
	"Far Step",
	"Flame Strike",
	"Geas",
	"Greater Restoration",
	"Hallow",
	"Hold Monster",
	"Holy Weapon",
	"Immolation",
	"Infernal Calling",
	"Insect Plague",
	"Legend Lore",
	"Maelstrom",
	"Mass Cure Wounds",
	"Mislead",
	"Modify Memory",
	"Negative Energy Flood",
	"Passwall",
	"Planar Binding",
	"Raise Dead",
	"Rary's Telepathic Bond",
	"Reincarnate",
	"Scrying",
	"Seeming",
	"Skill Empowerment",
	"Steel Wind Strike",
	"Swift Quiver",
	"Synaptic Static",
	"Telekinesis",
	"Teleportation Circle",
	"Transmute Rock",
	"Tree Stride",
	"Wall of Force",
	"Wall of Light",
	"Wall of Stone",
	"Wrath of Nature"
];
var spellscrolls6 = ["Arcane Gate",
	"Blade Barrier",
	"Bones of the Earth",
	"Chain Lightning",
	"Circle of Death",
	"Conjure Fey",
	"Contingency",
	"Create Homunculus",
	"Create Undead",
	"Disintegrate",
	"Drawmij's Instant Summons",
	"Druid Grove",
	"Eyebite",
	"Find the Path",
	"Flesh to Stone",
	"Forbiddance",
	"Globe of Invulnerability",
	"Guards and Wards",
	"Harm",
	"Heal",
	"Heroes' Feast",
	"Investiture of Flame",
	"Investiture of Ice",
	"Investiture of Stone",
	"Investiture of Wind",
	"Magic Jar",
	"Mass Suggestion",
	"Mental Prison",
	"Move Earth",
	"Otiluke's Freezing Sphere",
	"Otto's Irresistible Dance",
	"Planar Ally",
	"Primordial Ward",
	"Programmed Illusion",
	"Scatter",
	"Soul Cage",
	"Sunbeam",
	"Tenser's Transformation",
	"Transport via Plants",
	"True Seeing",
	"Wall of Ice",
	"Wall of Thorns",
	"Wind Walk",
	"Word of Recall"
];
var spellscrolls7 = ["Conjure Celestial",
	"Crown of Stars",
	"Delayed Blast Fireball",
	"Divine Word",
	"Etherealness",
	"Finger of Death",
	"Fire Storm",
	"Forcecage",
	"Mirage Arcane",
	"Mordenkainen's Magnificent Mansion",
	"Mordenkainen's Sword",
	"Plane Shift",
	"Power Word Pain",
	"Prismatic Spray",
	"Project Image",
	"Regenerate",
	"Resurrection",
	"Reverse Gravity",
	"Sequester",
	"Simulacrum",
	"Symbol",
	"Teleport",
	"Temple of the Gods",
	"Whirlwind"
];
var spellscrolls8 = ["Abi-Dalzim's Horrid Wilting",
	"Animal Shapes",
	"Antimagic Field",
	"Antipathy/Sympathy",
	"Clone",
	"Control Weather",
	"Demiplane",
	"Dominate Monster",
	"Earthquake",
	"Feeblemind",
	"Glibness",
	"Holy Aura",
	"Illusory Dragon",
	"Incendiary Cloud",
	"Maddening Darkness",
	"Maze",
	"Mighty Fortress",
	"Mind Blank",
	"Power Word Stun",
	"Sunburst",
	"Telepathy",
	"Tsunami"
];
var spellscrolls9 = ["Astral Projection",
	"Foresight",
	"Gate",
	"Imprisonment",
	"Invulnerability",
	"Mass Heal",
	"Mass Polymorph",
	"Meteor Swarm",
	"Power Word Heal",
	"Power Word Kill",
	"Prismatic Wall",
	"Psychic Scream",
	"Shapechange",
	"Storm of Vengeance",
	"Time Stop",
	"True Polymorph",
	"True Resurrection",
	"Weird",
	"Wish"
];

var weapons = ["Quarterstaff",
	"Sickle",
	"Spear",
	"Crossbow, Light",
	"Dart",
	"Shortbow",
	"Sling",
	"Battleaxe",
	"Flail",
	"Glaive",
	"Greataxe",
	"Greatsword",
	"Halberd",
	"Lance",
	"Longsword",
	"Maul",
	"Morningstar",
	"Pike",
	"Rapier",
	"Scimitar",
	"Shortsword",
	"Trident",
	"War Pick",
	"Warhammer",
	"Whip",
	"Blowgun",
	"Crossbow, Hand",
	"Crossbow, Heavy",
	"Longbow",
	"Net"
];

function getRandomWeapon() {
	var randomWeapon =  weapons[Math.floor(Math.random() * weapons.length)];
	return randomWeapon;
}