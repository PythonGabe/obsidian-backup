
```dataviewjs
function getWeekStart(date) {
  const offset = Duration.fromObject({ days: 1 })
  return date
    .plus(offset)
    .startOf('week')
    .minus(offset)
}
function getWeekFinish(date) {
  const offset = Duration.fromObject({ days: 1 })
  return date
    .plus(offset)
    .endOf('week')
    .minus(offset)
}

let current_day = new DateTime({})
const startOfWeek = getWeekStart(current_day);
const endOfWeek = getWeekFinish(current_day);  
const spansMultipleMonths = startOfWeek.month !== endOfWeek.month;
var formattedString = `${startOfWeek.toFormat("yyyy, MMMM ")} ${startOfWeek.toFormat("d")} - ${endOfWeek.toFormat("d")}`;
dv.header(3, "Current Week: " + formattedString);

var days = Info.weekdays('short')
console.log(days)
var company_totals = {}
var pages = dv.pages("#schedule")

pages = pages.where(p => getWeekStart(p.day).weekNumber == startOfWeek.weekNumber)
	
pages.forEach(page => {
	var tasks = page.file.lists.where(t => 'time' in t)
	var tasks_by_company = tasks.groupBy(t => t.company)
	console.log(tasks_by_company)
	tasks_by_company.forEach(ct => {
		var total = Duration.fromObject({})
		ct.rows.forEach(task => {
			total = total.plus(task.time)
		})
		if (!(ct.key in company_totals)) {
			company_totals[ct.key] = {}
			for (let day in days) {
				company_totals[ct.key][day] = Duration.fromObject({})
			}
		}
		console.log(company_totals)
		console.log(page.day.weekday)
		company_totals[ct.key][page.day.weekday - 1] =
			company_totals[ct.key][page.day.weekday - 1].plus(total)
	})
})

console.log(company_totals)
var results = []
for (let company in company_totals) {
	var row = [company]
	for(let day in company_totals[company]) {
		row.push(company_totals[company][day].toFormat("hH m") + "")
	}
	results.push(row)
}
console.log("here")
if (company_totals != {}) {
	dv.table(["Company"].concat(days), results)
}

```


```dataviewjs
function getWeekStart(date) {
  const offset = Duration.fromObject({ days: 1 })
  return date
    .plus(offset)
    .startOf('week')
    .minus(offset)
}

function getWeekFinish(date) {
  const offset = Duration.fromObject({ days: 1 })
  return date
    .plus(offset)
    .endOf('week')
    .minus(offset)
}

for (let group of dv.pages("#schedule").groupBy(p => getWeekStart(p.day)).sort(k => getWeekStart(k.rows.first().day), 'desc') ) {
	var tasks = []
	let day = group.rows.first().day
	const startOfWeek = getWeekStart(day);
	const endOfWeek = getWeekFinish(day);  
	const spansMultipleMonths = startOfWeek.month !== endOfWeek.month;
	var formattedString = `${startOfWeek.toFormat("yyyy, MMMM ")} ${startOfWeek.toFormat("d")} - ${endOfWeek.toFormat("d")}`;
	if (spansMultipleMonths) {
		formattedString += ` (${endOfWeek.toFormat("MMMM")})`;
	}
	for (let file of group.rows) {
		tasks = tasks.concat(file.file.lists.array())
	}
	tasks = dv.array(tasks).where(t => 'time' in t)
	var tasks_by_company = tasks.groupBy(t => t.company)
	var company_totals = []
	tasks_by_company.forEach(ct => {
		var total = Duration.fromObject({})
		ct.rows.forEach(task => {
			total = total.plus(task.time)
		})
		company_totals.push([ct.key, total])
	})
	if (tasks.length > 0) {
		dv.header(4, formattedString);
		dv.table(["Company", "Total Hours"],
			company_totals
				.sort(k => k[1], 'desc')
				.map(k => [k[0], k[1].toFormat("h 'hours' m 'mins'")]))
	} else {
		dv.header(5, formattedString);
	}
}
```


