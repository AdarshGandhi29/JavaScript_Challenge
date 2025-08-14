'use strict';

const users = [
  { id: 1, name: "Alice", country: "USA", age: 25 },
  { id: 2, name: "Bob", country: "India", age: 30 },
  { id: 3, name: "Charlie", country: "USA", age: 35 },
  { id: 4, name: "David", country: "UK", age: 30 },
  { id: 5, name: "Eve", country: "India", age: 22 },
  { id: 6, name: "Alice", country: "USA", age: 25 }
];

function reverse_users(list) {
  let result = [];
  for (let i = list.length - 1; i >= 0; i--) {
    result.push(list[i]);
  }
  return result;
}

function remove_duplicates(list) {
  let ids = new Set();
  return list.filter(person => {
    if (ids.has(person.id)) return false;
    ids.add(person.id);
    return true;
  });
}

function remove_exact_duplicates(list) {
  let seen = new Set();
  return list.filter(person => {
    let key = JSON.stringify(person);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function unique_countries(list) {
  return Array.from(new Set(list.map(p => p.country)));
}

function group(list) {
  let grouped = {};
  for (let person of list) {
    if (!grouped[person.country]) {
      grouped[person.country] = [];
    }
    grouped[person.country].push(person);
  }
  return grouped;
}

function older_than_25(list) {
  return list
    .filter(p => p.age > 25)
    .sort((a, b) => {
      if (a.age !== b.age) return a.age - b.age;
      if (a.name !== b.name) return a.name.localeCompare(b.name);
      return a.id - b.id;
    });
}

function names(list) {
  return list.map(p => p.name);
}

module.exports = {
  users,
  reverse_users,
  remove_duplicates,
  remove_exact_duplicates,
  unique_countries,
  group,
  older_than_25,
  names
};

if (require.main === module) {
  console.log('1. Reversed IDs:', reverse_users(users).map(p => p.id));
  console.log('2. Unique by ID:', remove_duplicates(users).map(p => p.id));
  console.log('3. Unique Countries:', unique_countries(users));
  console.log('4. Grouped by Country:', Object.keys(group(users)));
  console.log('5. Older than 25 (sorted):', older_than_25(users).map(p => `${p.name}:${p.age}`));
  console.log('6. Names:', names(users));
}
