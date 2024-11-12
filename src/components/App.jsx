import React, { Component } from 'react';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from './Filter';
import styles from './ContactForm.module.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: ''
    };
  }

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (newContact) => {
    const duplicate = this.state.contacts.find(contact => contact.name === newContact.name);
    if (duplicate) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact]
    }));
  };

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <div>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2 className={styles.title}>Contacts</h2>
        <Filter filter={this.state.filter} setFilter={this.setFilter} />
        <ContactList contacts={filteredContacts} deleteContact={this.deleteContact} />
      </div>
    );
  }
}

export default App;


