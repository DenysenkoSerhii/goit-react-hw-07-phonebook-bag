import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


import MyContactsForm from "./MyContactsForm/MyContactsForm";
import MyContactList from "./MyContactList/MyContactList";
import MyContactsFilter from "./MyContactsFilter/MyContactsFilter";


import {
    fetchAllContacts,
    fetchAddContact,
    fetchDeleteContact
} from "../redux/contacts/contacts-operations";


import {setFilter} from "../redux/filter/filter-slice";

import { getFilteredContacts } from "../redux/contacts/contacts-selectors";
import {getFilter} from "../redux/filter/filter-selectors";


import styles from "./my-contacts.module.scss";

const MyContacts = () => {
    const filteredContacts = useSelector(getFilteredContacts);
   
    const filter = useSelector(getFilter);

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchAllContacts())
    }, [dispatch])
 
   
    const handleAddContact = ({ name, number }) => {
       dispatch(fetchAddContact({ name, number }));
    }
    
    const removeContact = (id) => {
        dispatch(fetchDeleteContact(id));
    }
    const handleFilter = ({ target }) => {
        dispatch(setFilter(target.value))
    };

    const isContacts = Boolean(filteredContacts.length);
    

    return (
        <div>
               <h1>Phonebook</h1>
                <div className={styles.wrapper}>
                    <div className={styles.block}>
                        <h4>Add contact</h4>
                        <MyContactsForm onSubmit={handleAddContact} />
                     </div>
                     <h2>Contacts</h2>
                    <div className={styles.block}>
                         <MyContactsFilter value={filter} handleChange={handleFilter} />
                         {isContacts && <MyContactList removeContact={removeContact} contacts={filteredContacts} />}
                         {!isContacts && <p>No contacts in list</p>}
                     </div>
                 </div>
             </div>
        
    )
}

export default MyContacts;
// class MyContacts extends Component {

//     state = {
//         contacts: [],
//         filter: "",
//     }

//     componentDidMount() {
//         const contacts = JSON.parse(localStorage.getItem("my-contacts"));
//         if(contacts?.length) {
//             this.setState({contacts})
//         }
//     }

//     componentDidUpdate(prevProps, prevState){
     
//         const {contacts} = this.state;
//         if(prevState.contacts.length !== contacts.length) {
//            localStorage.setItem("my-contacts", JSON.stringify(contacts));
//         }
//     }

//     removeContact = (id) => {
//         this.setState(({contacts}) => {
//             const newContacts = contacts.filter(contact => contact.id !== id);
//             return {contacts: newContacts}
//         })
//     }

//     addContact = ({name, number}) => {
//         if(this.isDublicate(name, number)) {
//             alert(`${name}. : ${number} is already in contacts`); 
//             return false;
//         }

//         this.setState(prevState => {
//             const {contacts} = prevState;

//             const newContact = {
//                 id: nanoid(),
//                 name,
//                 number,
//             }

//             return {contacts: [newContact, ...contacts]}
//         })
//         return true;
//     }

//     handleFilter = ({target})=> {
//         this.setState({filter: target.value})
//     }

//     isDublicate(name, number) {
//         const normalizedTitle = name.toLowerCase();
//         const normalizedAuthor = number.toLowerCase();
//         const {contacts} = this.state;
//         const result = contacts.find(({name, number}) => {
//             return (name.toLowerCase() === normalizedTitle && number.toLowerCase() === normalizedAuthor)
//         })

//         return Boolean(result)
//     }

//     getFilteredContacts() {
//         const {filter, contacts} = this.state;
//         if(!filter) {
//             return contacts;
//         }
        
//         const normalizedFilter = filter.toLowerCase()
//         const result = contacts.filter(({name, number})=> {
//             return (name.toLowerCase().includes(normalizedFilter) ||  number.toLowerCase().includes(normalizedFilter))
//         })

//         return result;
//     }

//     render() {
//         const {addContact, removeContact, handleFilter} = this;
//         const contacts = this.getFilteredContacts();
//         const isContacts = Boolean(contacts.length);
  
//         return (
//             <div>
//                 <h1>Phonebook</h1>
//                 <div className={styles.wrapper}>
//                     <div className={styles.block}>
//                         <h4>Add contact</h4>
//                         <MyContactsForm onSubmit={addContact} />
//                     </div>
//                     <h2>Contacts</h2>
//                     <div className={styles.block}>
//                         <MyContactsFilter handleChange={handleFilter} />
//                         {isContacts && <MyContactList removeContact={removeContact} contacts={contacts} />}
//                         {!isContacts && <p>No books in list</p>}
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

