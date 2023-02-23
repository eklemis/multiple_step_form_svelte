export const type_to_num = (bil_type) => {
	switch (bil_type) {
		case 'arcade':
			return 1;
		case 'advanced':
			return 2;
		case 'pro':
			return 3;
	}
	return 0;
};

export const num_to_type = (num) => {
	return num === 1
		? 'arcade'
		: num === 2
		? 'advanced'
		: num === 3
		? 'pro'
		: num === 0
		? 'none'
		: 'none';
};
