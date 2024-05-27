import React, { useState } from 'react';

// ContactForm component to input new contacts
const ContactForm = ({ addContact }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [status, setStatus] = useState('active');  // Default status

    const handleSubmit = (e) => {
        e.preventDefault();
        addContact({ firstName, lastName, status });
        setFirstName('');
        setLastName('');
        setStatus('active');  // Reset to default status after submission
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <legend style={styles.legend}>Add New Contact</legend>
            <input 
                type="text" 
                placeholder="First Name" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                required
                style={styles.input}
            />
            <input 
                type="text" 
                placeholder="Last Name" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                required
                style={styles.input}
            />
            <div style={styles.radioGroup}>
                <input 
                    type="radio" 
                    id="active" 
                    name="status" 
                    value="active" 
                    checked={status === 'active'}
                    onChange={() => setStatus('active')} 
                    style={styles.radio}
                />
                <label htmlFor="active" style={styles.label}>Active</label>
                <input 
                    type="radio" 
                    id="inactive" 
                    name="status" 
                    value="inactive" 
                    checked={status === 'inactive'}
                    onChange={() => setStatus('inactive')} 
                    style={styles.radio}
                />
                <label htmlFor="inactive" style={styles.label}>Inactive</label>
            </div>
            <button type="submit" style={styles.button}>Add Contact</button>
        </form>
    );
};

// ContactList component to show the list of contacts
const ContactList = ({ contacts }) => {
    return (
        <ul style={styles.list}>
            {contacts.map((contact, index) => (
                <li key={index} style={styles.listItem}>
                    {contact.firstName} {contact.lastName} - {contact.status}
                </li>
            ))}
        </ul>
    );
};

// Main Contact component that integrates the form and list
const Contact = () => {
    const [contacts, setContacts] = useState([]);

    const addContact = (contact) => {
        setContacts([...contacts, contact]);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Contact</h2>
            <ContactForm addContact={addContact} />
            <ContactList contacts={contacts} />
        </div>
    );
};

// Styles object
const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    legend: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        padding: '15px',
        width:'500px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '2px solid #ccc',
    },
    radioGroup: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '10px',
    },
    radio: {
        cursor: 'pointer',
    },
    label: {
        cursor: 'pointer',
    },
    button: {
        padding: '15px 30px',
        fontSize: '18px',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    list: {
        listStyleType: 'none',
        padding: '0',
        width: '100%',
        marginTop: '20px',
    },
    listItem: {
        padding: '10px',
        backgroundColor: '#f8f8f8',
        borderBottom: '1px solid #ddd',
        borderRadius: '4px',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
        margin: '0 0 20px 0',
    }
};

export default Contact;
