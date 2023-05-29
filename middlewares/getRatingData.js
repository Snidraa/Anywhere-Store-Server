module.exports = function (data) {
	const rates = data.rows.map(item => item.rate);
	const ratesCount = data.count;
	const exactRating = rates.reduce((acc, currentValue) => acc + currentValue, 0) / ratesCount;
	const rate = Math.floor(exactRating * 10) / 10;
	return { rate, ratesCount };
};
