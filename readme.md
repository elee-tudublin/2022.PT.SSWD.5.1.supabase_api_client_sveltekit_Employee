### Getting Started

1. `npm install`
2. `npm run dev`



## Supabase API Documentation

These are the API samples from Supabase.



### The `department` table

```javascript

// READ ALL ROWS
let { data: department, error } = await supabase
  .from('department')
  .select('*')

// READ SPECIFIC COLUMNS
let { data: department, error } = await supabase
  .from('department')
  .select('some_column,other_column')

// WITH FILTERING
let { data: department, error } = await supabase
  .from('department')
  .select("*")

  // Filters
  .eq('column', 'Equal to')
  .gt('column', 'Greater than')
  .lt('column', 'Less than')
  .gte('column', 'Greater than or equal to')
  .lte('column', 'Less than or equal to')
  .like('column', '%CaseSensitive%')
  .ilike('column', '%CaseInsensitive%')
  .is('column', null)
  .in('column', ['Array', 'Values'])
  .neq('column', 'Not equal to')

  // Arrays
  .cs('array_column', ['array', 'contains'])
  .cd('array_column', ['contained', 'by'])


// INSERT A ROW
const { data, error } = await supabase
  .from('department')
  .insert([
    { some_column: 'someValue', other_column: 'otherValue' },
  ])


// UPDATE MATCHING ROWS
const { data, error } = await supabase
  .from('department')
  .update({ other_column: 'otherValue' })
  .eq('some_column', 'someValue')

// DELETE MATCHING ROWS
const { data, error } = await supabase
  .from('department')
  .delete()
  .eq('some_column', 'someValue')

```





### The `employee` table

```javascript
// Read all rows
let { data: employee, error } = await supabase
  .from('employee')
  .select('*')

// READ SPECIFIC COLUMNS
let { data: employee, error } = await supabase
  .from('employee')
  .select('some_column,other_column')

// WITH FILTERING
let { data: employee, error } = await supabase
  .from('employee')
  .select("*")

  // Filters
  .eq('column', 'Equal to')
  .gt('column', 'Greater than')
  .lt('column', 'Less than')
  .gte('column', 'Greater than or equal to')
  .lte('column', 'Less than or equal to')
  .like('column', '%CaseSensitive%')
  .ilike('column', '%CaseInsensitive%')
  .is('column', null)
  .in('column', ['Array', 'Values'])
  .neq('column', 'Not equal to')

  // Arrays
  .cs('array_column', ['array', 'contains'])
  .cd('array_column', ['contained', 'by'])


// INSERT A ROW
const { data, error } = await supabase
  .from('employee')
  .insert([
    { some_column: 'someValue', other_column: 'otherValue' },
  ])

// UPDATE MATCHING ROWS
const { data, error } = await supabase
  .from('employee')
  .update({ other_column: 'otherValue' })
  .eq('some_column', 'someValue')

// DELETE MATCHING ROWS
const { data, error } = await supabase
  .from('employee')
  .delete()
  .eq('some_column', 'someValue')

```

