const res = await fetch('http://localhost:9000/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: '2st Updated Post',
    content: 'This is the updated content of the post.',
  }),
})

console.log(await res.json())

export {}
