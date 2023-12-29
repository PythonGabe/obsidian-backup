---
obsidianEditingMode: source
---
<%* let current_week_day = tp.user.week_day(tp, tp.file.title) -%>
<%*
tp.hooks.on_all_templates_executed(async () =>
	{
		const file = tp.file.find_tfile(tp.file.path(true));
		await app.fileManager.processFrontMatter(file, (frontmatter) =>
		{ 
			frontmatter["obsidianEditingMode"] = "live";
			frontmatter["cssclass"] = "daily-note";
		}); 
	});
-%>
### - Weekly Goals
```tasks
not done
<% await current_week_day.get_goals_file_matcher() %>
group by heading reverse
```
## Daily Goals
## GOOD BOI Points
1. 
#### - Completed
```tasks
done
(folder includes 1 - Daily Notes) AND (heading regex matches /Goals/) AND (done on {{date:YYYY-MM-DD}})
```

## Active Projects
<%*
// Move this into a function or something...
const dv = this.app.plugins.plugins["dataview"].api;

// Define the calculation for sorting
	const calculateScore = (page) => {  
	let timeRelevant = Number(page.time_relevant) || 0;
	let desire = Number(page.desire) || 0;
	let need = Number(page.need) || 0;
	let cost = Number(page.cost) || 0;
	return 30 - timeRelevant - desire - need + cost;
};

// Query the pages
const results = dv.pages('"Projects"')
    .where(p => !p.file.path.includes("Projects/__Completed__"))
    .where(p => !p.file.path.includes("Projects/Project Ideas"))
    .where(p => p.active === true)
    .sort(p => calculateScore(p))
    .map(page => {
        return `- ${page.file.link} | ${page.type} | ${calculateScore(page)}`;
    });

// Convert results to a string
const resultsString = results.join('\n');

// Output the results
tR += resultsString;
%>
## To-dos
<%* if (current_week_day.is("Su") || current_week_day.is("We")) { -%>
- [ ] Refresh Cat Water
<%* } -%>
<%* if (current_week_day.is("Th")) { -%>
- [ ] Vacuum Living Room
- [ ] Vacuum Office
- [ ] Vacuum Dining Room
- [ ] Vacuum Kitchen
- [ ] Vacuum Bed
<%* } -%>
<%* if (current_week_day.is("Su")) { -%>
- [ ] Water Plants
- [ ] Go through Budget
- [ ] Do laundry
- [ ] Clean CPAP
- [ ] Weekly Goals
<%* } -%>

#### - Active/Carry Over
```tasks
filter by function task.file.path.includes("1 - Daily Notes/Active To-dos.md")
short mode
not done
group by heading
sort by created
```
#### - Scheduled
```tasks
not done
(((folder includes 1 - Daily Notes) AND (heading regex matches /To-dos/)) OR (tag includes dnp)) AND (scheduled on {{date:YYYY-MM-DD}})
short mode
sort by priority
```
#### - Overdue
```tasks
not done
(((folder includes 1 - Daily Notes) AND (heading regex matches /To-dos/) AND (((created before {{date:YYYY-MM-DD}}) AND (no scheduled date)) OR (scheduled before {{date:YYYY-MM-DD}}))) OR ((tag includes dnp) AND (scheduled before {{date:YYYY-MM-DD}})))
short mode
sort by priority
```
#### - Completed
```tasks
done
((folder includes 1 - Daily Notes) AND (heading regex matches /To-dos/)) OR (tag includes dnp)
short mode
done on {{date:YYYY-MM-DD}}
```

<%* if (current_week_day.is_weekday()) { -%>
## Work Priorities
- 
<%* } -%>
<%* if (false) { -%>
### Empirico

#### - Scheduled
```tasks
not done
(((folder includes 1 - Daily Notes) AND (heading regex matches /Empirico/)) OR (tag includes dne)) AND (scheduled on {{date:YYYY-MM-DD}})
short mode
sort by priority
```
#### - Overdue
```tasks
not done
(((folder includes 1 - Daily Notes) AND (heading regex matches /Empirico/) AND (((created before {{date:YYYY-MM-DD}}) AND (no scheduled date)) OR (scheduled before {{date:YYYY-MM-DD}}))) OR ((tag includes dne) AND (scheduled before {{date:YYYY-MM-DD}})))
short mode
sort by priority
```
#### - Completed
```tasks
done
((folder includes 1 - Daily Notes) AND (heading regex matches /Empirico/)) OR (tag includes dne)
short mode
done on {{date:YYYY-MM-DD}}
```

### Corewell
#### - Scheduled
```tasks
not done
(((folder includes 1 - Daily Notes) AND (heading regex matches /Corewell/)) OR (tag includes dnc)) AND (scheduled on {{date:YYYY-MM-DD}})
short mode
sort by priority
```
#### - Overdue
```tasks
not done
(((folder includes 1 - Daily Notes) AND (heading regex matches /Corewell/) AND (((created before {{date:YYYY-MM-DD}}) AND (no scheduled date)) OR (scheduled before {{date:YYYY-MM-DD}}))) OR ((tag includes dnc) AND (scheduled before {{date:YYYY-MM-DD}})))
short mode
sort by priority
```
#### - Completed
```tasks
done
((folder includes 1 - Daily Notes) AND (heading regex matches /Corewell/)) OR (tag includes dnc)
done on {{date:YYYY-MM-DD}}
short mode
```
<%* } -%>