class Utils {
	static formatDateToLocal(requestDate) {
		let format = {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			separator: '/',
		};
		const formatter = new Intl.DateTimeFormat('en-US', format)
		return formatter.format(requestDate)
			.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'); // Regex to swap month and day
	}

	static formatTimeToLocal(requestDate) {
		let format = {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		};
		const formatter = new Intl.DateTimeFormat('en-US', format)
		return formatter.format(requestDate)
			.replace(/(\d{2}):(\d{2})/, '$1:$2'); // Regex to swap month and day
	}

	static convertDateTimeToLocal(requestDate) {
		const parsedDate = new Date(requestDate);

		// Check if parsing was successful (returns Invalid Date if parsing fails)
		if(isNaN(parsedDate.getTime())) {
			throw new Error('Invalid date format: Please provide a valid date string.');
		}
		const monthNames = {
			0: 'Jan',
			1: 'Feb',
			2: 'Mar',
			3: 'Apr',
			4: 'Mei',
			5: 'Jun',
			6: 'Jul',
			7: 'Agu',
			8: 'Sep',
			9: 'Okt',
			10: 'Nov',
			11: 'Des',
		};

		let format = {
			hour: 'numeric',
			minute: 'numeric',
			hour12: false,
		};
		return `${ parsedDate.toLocaleDateString('id-ID', { day: '2-digit' }) } ${ monthNames[parsedDate.getMonth()] } ${ parsedDate.getFullYear() } ${ parsedDate.toLocaleTimeString('id-ID', format) } WIB`;
	}

	static ACTION_TYPE = {
		ADD: 'ADD',
		EDIT: 'EDIT',
		DELETE: 'DELETE',
		VIEW: 'VIEW',
	}

	/**
	 * Get first character from first & last sentences of a username
	 * @param {String} name - Username
	 * @return {String} 2 characters string
	 */
	static getNameInitial(name) {
		let initials = name.match(/\b\w/g) || [];
		return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
	}

	/**
	 * Get current path related object from Navigation Tree
	 * @param {Array} navTree - Navigation Tree from directory 'configs/NavigationConfig'
	 * @param {String} path - Location path you looking for e.g '/app/dashboards/analytic'
	 * @return {Object} object that contained the path string
	 */
	static getRouteInfo(navTree, path) {
		if(navTree.path === path) {
			return navTree;
		}
		let route;
		for(let p in navTree) {
			if(navTree.hasOwnProperty(p) && typeof navTree[p] === 'object') {
				route = this.getRouteInfo(navTree[p], path);
				if(route) {
					return route;
				}
			}
		}
		return route;
	}

	/**
	 * Get accessible color contrast
	 * @param {String} hex - Hex color code e.g '#3e82f7'
	 * @return {String} 'dark' or 'light'
	 */
	static getColorContrast(hex) {
		const threshold = 130;
		const hRed = hexToR(hex);
		const hGreen = hexToG(hex);
		const hBlue = hexToB(hex);

		function hexToR(h) {
			return parseInt((cutHex(h)).substring(0, 2), 16)
		}

		function hexToG(h) {
			return parseInt((cutHex(h)).substring(2, 4), 16)
		}

		function hexToB(h) {
			return parseInt((cutHex(h)).substring(4, 6), 16)
		}

		function cutHex(h) {
			return (h.charAt(0) === '#') ? h.substring(1, 7) : h
		}

		const cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
		if(cBrightness > threshold) {
			return 'dark'
		} else {
			return 'light'
		}
	}

	/**
	 * Darken or lighten a hex color
	 * @param {String} color - Hex color code e.g '#3e82f7'
	 * @param {Number} percent - Percentage -100 to 100, positive for lighten, negative for darken
	 * @return {String} Darken or lighten color
	 */
	static shadeColor(color, percent) {
		let R = parseInt(color.substring(1, 3), 16);
		let G = parseInt(color.substring(3, 5), 16);
		let B = parseInt(color.substring(5, 7), 16);
		R = parseInt(R * (100 + percent) / 100);
		G = parseInt(G * (100 + percent) / 100);
		B = parseInt(B * (100 + percent) / 100);
		R = (R < 255) ? R : 255;
		G = (G < 255) ? G : 255;
		B = (B < 255) ? B : 255;
		const RR = ((R.toString(16).length === 1) ? `0${ R.toString(16) }` : R.toString(16));
		const GG = ((G.toString(16).length === 1) ? `0${ G.toString(16) }` : G.toString(16));
		const BB = ((B.toString(16).length === 1) ? `0${ B.toString(16) }` : B.toString(16));
		return `#${ RR }${ GG }${ BB }`;
	}

	/**
	 * Returns either a positive or negative
	 * @param {Number} number - number value
	 * @param {any} positive - value that return when positive
	 * @param {any} negative - value that return when negative
	 * @return {any} positive or negative value based on param
	 */
	static getSignNum(number, positive, negative) {
		if(number > 0) {
			return positive
		}
		if(number < 0) {
			return negative
		}
		return null
	}

	/**
	 * Returns either ascending or descending value
	 * @param {Object} a - antd Table sorter param a
	 * @param {Object} b - antd Table sorter param b
	 * @param {String} key - object key for compare
	 * @return {any} a value minus b value
	 */
	static antdTableSorter(a, b, key) {
		if(typeof a[key] === 'number' && typeof b[key] === 'number') {
			return a[key] - b[key]
		}

		if(typeof a[key] === 'string' && typeof b[key] === 'string') {
			a = a[key].toLowerCase();
			b = b[key].toLowerCase();
			return a > b ? -1 : b > a ? 1 : 0;
		}
		return
	}

	/**
	 * Filter array of object
	 * @param {Array} list - array of objects that need to filter
	 * @param {String} key - object key target
	 * @param {any} value  - value that excluded from filter
	 * @return {Array} a value minus b value
	 */
	static filterArray(list, key, value) {
		let data = list
		if(list) {
			data = list.filter(item => item[key] === value)
		}
		return data
	}

	/**
	 * Remove object from array by value
	 * @param {Array} list - array of objects
	 * @param {String} key - object key target
	 * @param {any} value  - target value
	 * @return {Array} Array that removed target object
	 */
	static deleteArrayRow(list, key, value) {
		let data = list
		if(list) {
			data = list.filter(item => item[key] !== value)
		}
		return data
	}

	/**
	 * Wild card search on all property of the object
	 * @param {Number | String} input - any value to search
	 * @param {Array} list - array for search
	 * @return {Array} array of object contained keyword
	 */
	static wildCardSearch(list, input) {
		const searchText = (item) => {
			const upInput = input.toString().toUpperCase();
			for(let key in item) {
				if(item[key] == null) {
					continue;
				}
				if(typeof item[key] === 'object') {
					const isMatch = Object.values(item[key]).map(value => value?.toString().toUpperCase().includes(upInput)).includes(true)
					if(isMatch) return true;
					else continue;
				}
				if(item[key].toString().toUpperCase().indexOf(upInput) !== -1) {
					return true;
				}
			}
		};
		list = list.filter(value => searchText(value));
		return list;
	}

	/**
	 * Get Breakpoint
	 * @param {Object} screens - Grid.useBreakpoint() from antd
	 * @return {Array} array of breakpoint size
	 */
	static getBreakPoint(screens) {
		let breakpoints = []
		for(const key in screens) {
			if(screens.hasOwnProperty(key)) {
				const element = screens[key];
				if(element) {
					breakpoints.push(key)
				}
			}
		}
		return breakpoints
	}
}

export default Utils;

/**
 * Get Auth. Background Style
 * @param {string} param image string or hex color
 * @returns object
 */
export function getAuthBackgroundStyle(param) {
	return !param.includes('#') ? {
		backgroundImage: `url(${ param })`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	} : {
		backgroundColor: param,
	}
}

