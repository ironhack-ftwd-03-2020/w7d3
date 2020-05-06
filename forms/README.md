#### An HTML form keeps an internal state itself - as value in the input field for example. 
#### Also it redirects to a new page or rerenders the page it was displayed when submitting the form. 
#### We can take control of the form with JavaScript and, using the state and setState turn it into a so called 'controlled component'. 
#### In such a component the React state is the 'single source of truth' and React also controls what happens when the user changes the input.

#### We want to add a form to the App.js component that has a title and director input field and a checkbox for has Oscars.

#### First we add these additional properties to the state
```js
  state = {
    movies: moviesData,
    title: '',
    director: '',
    hasOscars: false
  };
```

#### Then we add the form - first without the onChange attribute 
#### We get an error and we also cannot enter anything in the input field 
#### If we enter something in the state it get's shown in the input - to fix the error we could add 'readOnly' to the form fields
```js
    <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
        type="text"
        name="title"
        id="title"
        value={this.state.title}
        // onChange={this.handleChange}
        />
        <label htmlFor="director">Director: </label>
        <input
        type="text"
        name="director"
        id="director"
        value={this.state.director}
        // onChange={this.handleChange}
        />
        <label htmlFor="hasOscars">Oscar ?</label>
        <input
        type="checkbox"
        name="hasOscars"
        id="hasOscars"
        checked={this.state.hasOscars}
        // onChange={this.handleCheckboxChange}
        />
        <button type="submit">Add a Movie</button>
    </form>
```

#### Now let's add the missing onChange handlers - first add it to the title

```js
    //
    onChange={this.handleTitleChange}
    // and the handleChange method
    handleTitleChange = event => {
        console.log(event.target.value);
        this.setState({
            title: event.target.value
        })
    }
```

#### Then for the director as well

```js
    //
    onChange={this.handleDirectorChange}
    // and the handleChange method
    handleDirectorChange = event => {
        console.log(event.target.value);
        this.setState({
            director: event.target.value
        })
    }
```

#### And for the checkbox

```js
    //
    onChange={this.handleCheckboxChange}
    // 
    handleCheckboxChange = event => {
        this.setState({
            hasOscars: event.target.checked
        })
    }
```

#### Now let's add the handleSubmit method - for the id of the movie we use uuid
```bash
$ npm install uuid
```

```js
    //
    import { v4 as uuid } from 'uuid';
    // we need this at the top of our form
    <form onSubmit={this.handleSubmit}>

    // 
    handleSubmit = event => {
        event.preventDefault();
        const { title, director, hasOscars } = this.state;
        const newMovie = {
            title,
            director,
            hasOscars,
            id: uuid()
        };
        this.setState({
            movies: [newMovie, ...this.state.movies],
            title: '',
            director: '',
            hasOscars: false
        });
    }
```

#### Now we can refactor the different handlers for director and title
```js
    // first step 
    handleChange = event => {
        const name = event.target.name;
        this.setState({
            // this is not working
            // event.target.name: event.target.value
            [name]: event.target.value
        });
    }
    // we can also destructure value 
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
```

#### Now let's also refactor the handler for the checkbox into the handleChange() - so that we only have one method
#### We check the type of the target if it is checkbox we use event.target.checked as value - if not we use event.target.value
```js
    // in the checkbox html
    onChange={this.handleChange}
    //
    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
```