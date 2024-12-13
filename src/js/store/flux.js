const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white",
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white",
                },
            ],
            contacts: [],
            newContacts: [
                {
                    name: "Juan",
                    email: "juan@gmail.com",
                    phone: "099000000",
                    address: "Av 18 de julio",
                },
                {
                    name: "Jose",
                    email: "jose@gmail.com",
                    phone: "098000000",
                    address: "Av de las Americas",
                },
            ],
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            loadSomeData: () => {
              
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo });
            },
            getContacts: async () => {
                try {
                    const actions = getActions();
                    const backendUrl = process.env.BACKEND_URL || '';
                    if (!backendUrl) {
                        console.error("URL de backend no configurada correctamente.");
                        return;
                    }

                    
                    const url = `${backendUrl}agendas/mgomunist`;

                    const resp = await fetch(url);
                    if (resp.status === 404) {
                        console.warn("Agenda no encontrada. Creando agenda...");
                        await actions.createAgenda();
                        const store = getStore();
                        for (const item of store.newContacts) {
                            await actions.createContact(item);
                        }
                        return;
                    }
                    const data = await resp.json();
                    console.log("Contactos obtenidos:", data);
                    setStore({ contacts: data.contacts || [] });
                } catch (error) {
                    console.error("Error obteniendo contactos:", error);
                }
            },
            createContact: async (newContact) => {
                if (!newContact.name || !newContact.email || !newContact.phone || !newContact.address) {
                    console.error("Faltan datos obligatorios para crear el contacto.");
                    return;
                }

                try {
                    const backendUrl = process.env.BACKEND_URL || '';
                    if (!backendUrl) {
                        console.error("URL de backend no configurada correctamente.");
                        return;
                    }

                   
                    const url = `${backendUrl}agendas/mgomunist/contacts`;

                    console.log("Creando contacto:", newContact);

                    const resp = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newContact),
                    });

                    if (resp.ok) {
                        console.log("Contacto creado correctamente.");
                        await getActions().getContacts();
                    } else {
                        console.error("Error al crear el contacto. Status:", resp.status);
                    }
                } catch (error) {
                    console.error("Error realizando la solicitud:", error);
                }
            },
            createAgenda: async () => {
                try {
                    const backendUrl = process.env.BACKEND_URL || '';
                    if (!backendUrl) {
                        console.error("URL de backend no configurada correctamente.");
                        return;
                    }

                    const url = `${backendUrl}agendas/mgomunist`;
                    console.log("Creando agenda...");

                    const resp = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                    });

                    if (resp.ok) {
                        console.log("Agenda creada correctamente.");
                    } else {
                        console.error("Error creando agenda. Status:", resp.status);
                    }
                } catch (error) {
                    console.error("Error creando agenda:", error);
                }
            },
            deleteContact: async (contact_id) => {
                try {
                    const backendUrl = process.env.BACKEND_URL || '';
                    if (!backendUrl) {
                        console.error("URL de backend no configurada correctamente.");
                        return;
                    }

                    const url = `${backendUrl}agendas/mgomunist/contacts/${contact_id}`;
                    const resp = await fetch(url, {
                        method: "DELETE",
                    });

                    if (resp.ok) {
                        console.log("Contacto eliminado correctamente.");
                        await getActions().getContacts();
                    } else {
                        console.error("Error al eliminar el contacto. Status:", resp.status);
                    }
                } catch (error) {
                    console.error("Error al eliminar el contacto:", error);
                }
            },
            editContact: async (id, updatedContact) => {
                try {
                    const backendUrl = process.env.BACKEND_URL || '';
                    if (!backendUrl) {
                        console.error("URL de backend no configurada correctamente.");
                        return;
                    }

                    const url = `${backendUrl}agendas/mgomunist/contacts/${id}`;
                    const resp = await fetch(url, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedContact),
                    });

                    if (resp.ok) {
                        console.log("Contacto editado correctamente.");
                        await getActions().getContacts();
                    } else {
                        console.error("Error editando contacto. Status:", resp.status);
                    }
                } catch (error) {
                    console.error("Error editando contacto:", error);
                }
            },
            clearContact: () => {
                setStore({
                    contact: { name: "", email: "", phone: "", address: "" },
                });
                console.log("Formulario de contacto limpiado.");
            },
        },
    };
};

export default getState;


