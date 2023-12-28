### <span class="orange">Active Projects</span> - (WIP Limit 3)
```dataview
list without id file.link + " | " + type + " | "  + (30 - time-relevant - desire - need + cost) 
from "Projects" and -"Projects/__Completed__" and -"Projects/Project Ideas"
sort (30 - time-relevant - desire - need + cost) ASC
where active = true
```
#### On-deck Projects
```dataview
list without id file.link + " | " + type + " | "  + (30 - time-relevant - desire - need + cost) 
from "Projects" and -"Projects/__Completed__" and -"Projects/Project Ideas"
sort (30 - time-relevant - desire - need + cost) ASC
where on-deck = true and !(active = true)
```
#### <span class="pink">Projects Backlog</span>
```dataview
list without id file.link + " | " + type + " | "  + (30 - time-relevant - desire - need + cost) 
from "Projects" and -"Projects/__Completed__" and -"Projects/Project Ideas"
sort (30 - time-relevant - desire - need + cost) ASC
where !(on-deck = true or active = true)
```
#### <span class="green">Completed Projects</span>
```dataview
list without id file.link
from "Projects/__Completed__"
sort file.ctime
```
