
let _day = undefined
let _tp = undefined

/**
 * Checks if the given file date is the specified day of the week.
 * @param {string} dayCheck - Two-letter abbreviation of the day to check.
 * @param {Moment} [file_date] - The date to check, defaults to current day if not provided.
 * @returns {boolean} True if file_date is the same as dayCheck.
 */
function is(dayCheck, file_date = _day.clone()) {
	const currentDayShort = moment(file_date, 'YYYY-MM-DD-dddd').format('dd');
	console.log("is", dayCheck, currentDayShort, currentDayShort === dayCheck);
	return currentDayShort === dayCheck;
}


/**
 * Determines if the given file date is a weekday.
 * @param {Moment} [file_date] - The date to check, defaults to current day if not provided.
 * @returns {boolean} True if file_date is a weekday.
 */
function is_weekday(file_date = _day.clone()) {
	console.log("is_weekday", file_date);
	return is_not("Su", file_date) && is_not("Sa", file_date);
}

/**
 * Checks if the given file date is not the specified day of the week.
 * @param {string} dayCheck - Two-letter abbreviation of the day to check.
 * @param {Moment} [file_date] - The date to check, defaults to current day if not provided.
 * @returns {boolean} True if file_date is not the same as dayCheck.
 */
function is_not(dayCheck, file_date = _day.clone()) {
	let currentDayShort = moment(file_date, 'YYYY-MM-DD-dddd').format('dd');
	console.log("is_not", dayCheck, currentDayShort, currentDayShort !== dayCheck)
	return currentDayShort !== dayCheck;
}

function _get_y_m_d_folder_and_title(folder, file_date = _day.clone(), include_year_folder = true) {
	console.log("_get_year_month_day_folder_and_title", folder, file_date)
	if (!include_year_folder) {
		return folder + "/" + (file_date.month() + 1) + "/" + file_date.format('YYYY-MM-DD-dddd')
	}
	return folder + "/" + (file_date.year() + 1) + "/" + (file_date.month() + 1) + "/" + file_date.format('YYYY-MM-DD-dddd')
}

function _get_weekly_goals_file_name(folder, file_date = _day.clone()) {
	console.log("_get_weekly_goals_file_name", folder, file_date)
	return _get_y_m_w_folder_and_title(folder, file_date, " Weekly Goals")
}

function _get_y_m_w_folder_and_title(folder, file_date = _day.clone(), post_name = "") {
	console.log("_get_y_m_w_folder_and_title", folder, file_date)
	let file_start_date = moment(file_date).weekday(1)
	let file_end_date = moment(file_date).add(1, 'weeks').weekday(0)
	let name = "(" + file_start_date.format("DD") + " to " + file_end_date.format("DD") + ")" + post_name
	let file_name = folder + "/" + file_start_date.year() + "/" + (file_start_date.month() + 1) + "/" + name
	return file_name
}

function get_title_for_page_in_schedule_notes(file_date = _day.clone()) {
	console.log("get_title_for_page_in_schedule_notes", file_date)
	return _get_y_m_d_folder_and_title("2 - Daily Schedules", file_date, false)
}

function get_rewards_log_title_page(file_date = _day.clone()) {
	console.log("get_rewards_log_title_page", file_date)
	return _get_y_m_d_folder_and_title("4 - Rewards/Daily Logs", file_date)
}

function get_rewards_weekly_title_page(file_date = _day.clone()) {
	console.log("get_rewards_weekly_title_page", file_date)
	return _get_weekly_goals_file_name("4 - Rewards/Weekly Goals", file_date)
}

function get_title_for_date_weekly_goals_page(file_date = _day.clone()) {
	return _get_weekly_goals_file_name("3 - Goals", file_date)
}

function get_goals_file_matcher(file_date = _day.clone()) {
	if (is('Su', file_date)) {
		file_date = moment(file_date).subtract(1, 'weeks')
	}
	return "filter by function task.file.path.includes(\"" + get_title_for_date_weekly_goals_page(file_date) + ".md\");"
}

async function find_date_for_new_weekly_goals_page(count = 0) {
	let file_start_date = moment().add(count, 'weeks')
	file_name = get_title_for_date_weekly_goals_page(file_start_date)
	let file_exists = await _tp.file.exists(file_name + ".md")
	if (file_exists) {
		console.log("find_date_for_new_weekly_goals_page", file_start_date, file_name, file_exists)
		return await find_date_for_new_weekly_goals_page(count + 1)
	} else {
		console.log("find_date_for_new_weekly_goals_page", file_start_date, file_name, file_exists)
		return file_start_date
	}
}

async function find_date_for_new_daily_schedule_page(count = 0) {
	if (count > 20) {
		return
	}
	let file_date = moment().add(count, 'days')
	let file_name = get_title_for_page_in_schedule_notes(file_date)
	let file_exists = await _tp.file.exists(file_name + ".md")
	if (file_exists) {
		console.log("find_date_for_new_daily_schedule_page", file_date, file_name, file_exists)
		return await find_date_for_new_daily_schedule_page(count + 1)
	} else {
		console.log("find_date_for_new_daily_schedule_page", file_date, file_name, file_exists)
		return file_date
	}
}

function get_day() {
	return _day;
}

module.exports = (tp_input, inputDate = undefined) => {
	_tp = tp_input

	if (inputDate) {
		console.log("inputDate", inputDate)
	} else {
		console.log("no inputDate")
	}

	_day = inputDate || moment().format('YYYY-MM-DD-dddd');

	if (typeof _day === 'string') {
		console.log("input is string", _day)
		_day = moment(_day, 'YYYY-MM-DD-dddd');
		console.log("formatted", _day)
	}

	return {
		is,
		is_not,
		is_weekday,
		find_date_for_new_daily_schedule_page,
		get_rewards_log_title_page,
		find_date_for_new_weekly_goals_page,
		get_title_for_date_weekly_goals_page,
		get_title_for_page_in_schedule_notes,
		get_rewards_weekly_title_page,
		get_goals_file_matcher,
		get_day,
	};
};
