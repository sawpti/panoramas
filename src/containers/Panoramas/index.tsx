import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Panorama from "../../components/Panorama";
import { IState } from "../../ducks";
import * as postsDuck from "../../ducks/Panoramas";
import SweetAlert from "react-bootstrap-sweetalert";
import services from 'src/service';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import noImage from '../../images/unnamed.jpg';

import {
    Spinner,
    //  Container,
    Alert,
    ListGroup,
    InputGroup,
    FormControl,
    Pagination,
    Navbar,
    Nav,
    Button,

} from "react-bootstrap";

// import { useState } from 'react';
// import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountain, faSearch, faMapPin, faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
// import Geocode from 'react-geocode'
import useOnclickOutside from "react-cool-onclickoutside";
import { IPanorama } from '../../ducks/Panoramas';
import { firestore } from 'firebase';
import BeautyStars from 'beauty-stars';






interface INewsFeedProps {
    // fetchPosts: () => void
    // fetchFindPanoramaComuna: (comuna: string, limite: number) => void
    // fetchFindPanoramasByComuna: (paginaSize: number, panoramaInicial: any, comuna: string) => void

    // xrealizar: (a: string) => any; // Referencia del panorama que vamos a a gregar a la lista  "Por realizar"
    // realizado: (a: string) => void; // Referencia del panorama que vamos a a gregar a la lista de "Realizados"
    // share: (a: string) => void; // vamos a necesitar la referencia del panorama  al que le damos share
    // sharetemp: (a: string) => void;
    porRealizarAdd: (p: IPanorama, fecha: Date) => any
    realizadoAdd: (p: IPanorama, fecha: Date, calificacion: number) => any
    fetched: boolean
    loading: boolean
    data1: postsDuck.IDataFirebase
    dataRealizadosByProveedor: postsDuck.IDataPanorama
}
interface IStatePanorama {
    // alert: any
    calificacion: number
    fechaInicial: Date
    idPanorama: string
    mensajeAccion: string
    uiobtenerFecha: boolean,

    work: boolean
    listPanoramas: postsDuck.IDataPanorama
    comuna: string
    activePage: number
    opcionAccion: number  // 1: Por realizar ( deseados) 2: Realizados
    paginaActual: number
    paginas: any[]
    paginaSize: number
    panorama: IPanorama
    panoramaInicial: any
    cargando: boolean
    totalPanoramas: number
    totalPaginas: number
    alert: React.ReactNode
    uidProveedor: string


}
interface IRespuesta {
    arrayP: postsDuck.IDataPanorama
    valorFinal: any
    valorInicial: any
}


class AllPanoramas extends React.Component<INewsFeedProps, IStatePanorama> {
    constructor(props: INewsFeedProps) {
        super(props);

        const { fetched } = props
        this.state = {
            activePage: 1,
            alert: null,
            calificacion: 0,
            cargando: true,
            comuna: "Curarrehue",
            fechaInicial: new Date(),
            idPanorama: "",
            listPanoramas: {},
            mensajeAccion: "",
            opcionAccion: 0,
            paginaActual: 0,
            paginaSize: 10, // panoramas por página
            paginas: [],
            panorama: {
                calificacion: 0,
                createdAt: firestore.Timestamp.fromDate(new Date()),
                descripcion: "",
                direccion: "string",
                exigenciaFisica: 0,
                lat: 0,
                lng: 0,
                nombre: "string",
                urlFacebook: " string",
                urlImagen: "string",
                urlImagen1: " string",
                urlImagen2: " string",
                urlMapUbicacion: "string",
                valor: 0,
            },
            panoramaInicial: null,

            totalPaginas: 0,
            totalPanoramas: 0,
            uidProveedor: "",
            uiobtenerFecha: false,
            work: false,
        }
        if (fetched) {
            return
        }




    }


    public cambiarCalificacion = (value: any) => {

        this.setState({
            calificacion: value
        })


    }

    public subMenuComunas = (comuna: string) => {


        switch (comuna) {
            case "Pucón":
                return (
                    <Navbar >
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link onClick={this.cambiarComuna("Curarrehue")}> Curarrehue </Nav.Link>
                                <Nav.Link active={true} onClick={this.cambiarComuna("Pucón")}> <u> Pucón</u> </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                )


                break;
            case "Curarrehue":
                return (
                    <Navbar >
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link active={true} onClick={this.cambiarComuna("Curarrehue")}>  <u>Curarrehue</u>  </Nav.Link>
                                <Nav.Link onClick={this.cambiarComuna("Pucón")}> Pucón </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                )
                break;
            default:
                return (
                    <Navbar >
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link active={true} onClick={this.cambiarComuna("Curarrehue")}> Curarrehue </Nav.Link>
                                <Nav.Link onClick={this.cambiarComuna("Pucón")}> Pucón </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                )
                break;
        }

    }

    public uiObterFecha = (panorama: IPanorama, mensajeAccion: string, opcionAccion: number) => () => {
        this.setState({
            mensajeAccion,
            opcionAccion, // 1 Por realizar, 2 Realiazado
            panorama,
            uiobtenerFecha: true,


        })
    }

    public cancelAdd = () => {
        this.setState({
            uiobtenerFecha: false
        });

    }
    public handleChangeDate = (date: any) => {
        this.setState({
            fechaInicial: date
        });
    };


    public onAlert = (irA: string, ruta: string) => {
        this.setState({
            alert: (
                <SweetAlert
                    success={true}
                    // customIcon={logo}
                    title="¡Listo!"
                    showCancel={true}
                    showCloseButton={true}
                    confirmBtnText="Sí"
                    cancelBtnText="No"
                    onCancel={this.hideAlert(false)}
                    onConfirm={this.onClickRegistro(ruta)}>
                    El panorama  ha sido agregado a tu lista de {irA} ¿Deseas revisarla ahora?
                </SweetAlert>
            ),
        });
    };

    public onAlertError = (error: string) => {

        this.setState({
            alert: (
                <SweetAlert
                    error={true}
                    title="¡Error!"
                    showCloseButton={true}
                    confirmBtnText="OK"
                    onConfirm={this.hideAlert(false)}>
                    Se ha producido un error: {error}
                </SweetAlert>
            ),
        });
    };


    public hideAlert = (redireccionar: boolean) => () => {
        this.setState({
            alert: null,
        });
        if (redireccionar) {
            location.href = "/app/allpanoramas"
        }

    };

    public onClickRegistro = (ruta: string) => () => {
        // location.href = '/register'
        location.href = `/app/${ruta}`

    }

    public onClickAccion = (opcion: number) => async () => {
        // tslint:disable-next-line: no-console
        console.log("Opcion: " + this.state.opcionAccion);
        switch (opcion) {
            case 1: // Por realizar
                this.porRealizar()

                break;

            case 2:
                this.realizado()
                break;

            default:
                return
                //   alert(" No ha seleccioando en una opción" + this.state.opcionAccion)
                break;
        }
        // this.setState({
        //     uiobtenerFecha: false
        // })

    }




    public obtenerData = (paginaSize: number, panoramaInicial: any, comuna: string) => {
        const { db, storage } = services
        let res: IRespuesta
        return new Promise(async (resolve, eject) => {
            let panoramas = db.collection("panoramas")
                .where('comuna', '==', comuna)
                .orderBy("calificacion", "desc")
                .limit(paginaSize)



            if (panoramaInicial !== null) {
                panoramas = db.collection("panoramas")
                    .where('comuna', '==', comuna)
                    .orderBy("calificacion", "desc")
                    .startAfter(panoramaInicial)
                    .limit(paginaSize)


                // if (comuna.trim() !== "") {

                //     panoramas = db.collection("panoramas")
                //         .orderBy("calificacion", "desc")
                //         .where("keyword", "array-contains", comuna)
                //         .startAfter(panoramaInicial)
                //         .limit(paginaSize)
                // }
            }


            const snapshot = await panoramas.get()



            const arrayPanoramas = {}
            snapshot.forEach((x) => (arrayPanoramas[x.id] = x.data()));
            const imgIds = await Promise.all(
                Object.keys(arrayPanoramas).map(async (x) => {
                    let url;
                    let url2;
                    let url1;
                    try {
                        const ref = storage.ref(`panoramas/${x}.jpeg`);

                        url = await ref.getDownloadURL();
                        const ref1 = storage.ref(`panoramas/${x}1.jpeg`);
                        url1 = await ref1.getDownloadURL();
                        const ref2 = storage.ref(`panoramas/${x}2.jpeg`);
                        url2 = await ref2.getDownloadURL();
                        return [x, url, `${x}1`, url1, `${x}2`, url2];
                    } catch (e) {
                        // tslint:disable-next-line: no-console
                        console.log("error", e);
                        return [x, url, `${x}1`, url1, `${x}2`, url2];
                        // return [
                        //     x,
                        //     url ? url : noImage
                        //         `${x}1`,
                        //     url1 ? url1 : noImage,
                        //     `${x}2`,
                        //     url2 ? url2 : noImage,
                        // ];
                    }
                })
            );

            const keyedImages = {};
            // Opción 1: una clave para una arreglo que contiene las tres imagens
            imgIds.forEach((x) => (keyedImages[x[0]] = [x[1], x[3], x[5]]));
            // Opción 1: de una clave para cada imagen
            Object.keys(arrayPanoramas).forEach(
                (x) =>
                    (arrayPanoramas[x] = {
                        ...arrayPanoramas[x], // estos son los campos que se llaman igual en la bd como en la interface
                        exigenciaFisica: arrayPanoramas[x].exigenciaFisica,
                        idPanorama: x,
                        uidProveedor: arrayPanoramas[x].uid,
                        urlFacebook: arrayPanoramas[x].urlFacebook,
                        urlImagen: keyedImages[x][0],
                        urlImagen1: keyedImages[x][1],
                        urlImagen2: keyedImages[x][2],
                        urlInstagram: arrayPanoramas[x].urlInstagram,
                        urlTripAdvisor: arrayPanoramas[x].urlTripAdvisor,
                        urlWeb: arrayPanoramas[x].urlWeb,
                    })

            )

            // tslint:disable-next-line: no-console
            //   console.log("Array panoramas sdasd: ", arrayPanoramas);
            const inicialValor = snapshot.docs[0]
            // tslint:disable-next-line: no-console
            // console.log("Valor inicial: ", inicialValor);
            const finalValor = snapshot.docs[snapshot.docs.length - 1]
            // // tslint:disable-next-line: no-console
            // console.log("Valor Final ", finalValor)

            res = {
                arrayP: arrayPanoramas,
                valorFinal: finalValor,
                valorInicial: inicialValor,
            }
            resolve(res);
        })
    }
    // (paginaSize: number, panoramaInicial: any, comuna: string)
    public obtenerDataAnterior = (paginaSize: number, panoramaInicial: any, comuna: string) => {
        const { db, storage } = services
        let res: IRespuesta
        return new Promise(async (resolve, eject) => {
            let panoramas = db.collection("panoramas")
                .where('comuna', '==', comuna)
                .orderBy("calificacion", "desc")
                .limit(paginaSize)


            if (panoramaInicial !== null) {

                panoramas = db.collection("panoramas")
                    .where('comuna', '==', comuna)
                    .orderBy("calificacion", "desc")
                    .startAt(panoramaInicial)
                    .limit(paginaSize)
            }



            const snapshot = await panoramas.get()



            const arrayPanoramas = {}
            snapshot.forEach((x) => (arrayPanoramas[x.id] = x.data()));
            const imgIds = await Promise.all(
                Object.keys(arrayPanoramas).map(async (x) => {
                    let url;
                    let url2;
                    let url1;
                    try {
                        const ref = storage.ref(`panoramas/${x}.jpeg`);

                        url = await ref.getDownloadURL();
                        const ref1 = storage.ref(`panoramas/${x}1.jpeg`);
                        url1 = await ref1.getDownloadURL();
                        const ref2 = storage.ref(`panoramas/${x}2.jpeg`);
                        url2 = await ref2.getDownloadURL();
                        return [x, url, `${x}1`, url1, `${x}2`, url2];
                    } catch (e) {
                        // tslint:disable-next-line: no-console
                        console.log("error", e);
                        return [x, url, `${x}1`, url1, `${x}2`, url2];

                    }
                })
            );

            const keyedImages = {};

            imgIds.forEach((x) => (keyedImages[x[0]] = [x[1], x[3], x[5]]));

            Object.keys(arrayPanoramas).forEach(
                (x) =>
                    (arrayPanoramas[x] = {
                        ...arrayPanoramas[x], // estos son los campos que se llaman igual en la bd como en la interface
                        exigenciaFisica: arrayPanoramas[x].exigenciaFisica,
                        idPanorama: x,
                        uidProveedor: arrayPanoramas[x].uid,
                        urlFacebook: arrayPanoramas[x].urlFacebook,
                        urlImagen: keyedImages[x][0],
                        urlImagen1: keyedImages[x][1],
                        urlImagen2: keyedImages[x][2],
                        urlInstagram: arrayPanoramas[x].urlInstagram,
                        urlTripAdvisor: arrayPanoramas[x].urlTripAdvisor,
                        urlWeb: arrayPanoramas[x].urlWeb,
                    })

            )
            const inicialValor = snapshot.docs[0]
            const finalValor = snapshot.docs[snapshot.docs.length - 1]

            res = {
                arrayP: arrayPanoramas,
                valorFinal: finalValor,
                valorInicial: inicialValor,
            }
            resolve(res);
        })

    }

    public siguientePagina = () => {
        const { paginaActual, paginaSize, comuna, paginas, totalPaginas } = this.state
        this.setState({
            cargando: true,
        });

        if (paginaActual === totalPaginas - 1) {
            this.setState({
                activePage: totalPaginas,
                cargando: false,
            })
            return
        }


        //  tslint:disable-next-line: no-console
        console.log("siguientePagina: Panoramas antes de la respuesta", this.state.listPanoramas)


        this.obtenerData(paginaSize, paginas[paginaActual].finalValor, comuna)
            .then((res: IRespuesta) => {
                const largoArray = Math.ceil(Object.keys(res.arrayP).length)
                //  tslint:disable-next-line: no-console
                console.log("largoArray", largoArray)
                //  tslint:disable-next-line: no-console
                console.log("siguientePagina:Panoramas depues de la repuesta", res.arrayP)
                //  tslint:disable-next-line: no-console
                console.log("FinalValor", paginas[paginaActual].finalValor.data().placeId)

                if (largoArray > 0) {
                    const pagina = {
                        finalValor: res.valorFinal,
                        inicialValor: res.valorInicial,

                    }
                    paginas.push(pagina)
                    this.setState(
                        {
                            cargando: false,
                            listPanoramas: res.arrayP,
                            paginaActual: paginaActual + 1,
                            paginas
                        }
                    )

                    //  tslint:disable-next-line: no-console
                    console.log("siguientePagina despues de la respuesta", this.state.listPanoramas)
                }


                this.setState({
                    cargando: false
                })

            })



    }
    public anteriorPagina = () => {
        const { paginaActual, paginaSize, comuna, paginas } = this.state
        this.setState({
            cargando: true,
        });
        if (paginaActual === 0) {
            this.setState({
                cargando: false
            })
            return
        }

        if (paginaActual > 0) {

            this.obtenerDataAnterior(paginaSize, paginas[paginaActual - 1].inicialValor, comuna)
                .then((res: IRespuesta) => {
                    const pagina = {
                        finalValor: res.valorFinal,
                        inicialValor: res.valorInicial,
                    }

                    paginas.push(pagina);

                    this.setState({
                        listPanoramas: res.arrayP,
                        paginaActual: paginaActual - 1,
                        paginas,
                    })


                    this.setState({
                        cargando: false
                    })

                })

        }


    }
    // Did Mount.
    public async componentDidMount() {
        const { auth, db } = services

        const u = auth.currentUser
        //   const uid= u?u.uid:"usuario no existe"

        if (u != null) {
            const { paginaSize, panoramaInicial, comuna, paginas } = this.state
            await db.collection("panoramas")
                .where('comuna', '==', comuna)
                .get().then(snp => {
                    // tslint:disable-next-line: no-console
                    console.log("Todos los panoramas", snp.docs.length)
                    // tslint:disable-next-line: no-console
                    console.log("Total página", snp.docs.length / paginaSize)

                    this.setState(
                        {
                            totalPaginas: Math.ceil(snp.docs.length / paginaSize),
                            totalPanoramas: snp.docs.length
                        }
                    )


                })

            this.obtenerData(paginaSize, panoramaInicial, comuna).then((res: IRespuesta) => {
                //  tslint:disable-next-line: no-console
                //  console.log("Data Firebase en componentDidMount[res]", res.arrayP);

                const pagina = {
                    finalValor: res.valorFinal,
                    inicialValor: res.valorInicial
                }
                paginas.push(pagina)
                this.setState({
                    cargando: false,
                    listPanoramas: res.arrayP,
                    paginas,

                })
            })
        }
    }





    // Did Update.
    public componentDidUpdate(prevProps: INewsFeedProps, prevState: IStatePanorama) {
        const { db } = services
        let key = ""

        /* const observer = */ db.collection('panoramas')
            .onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    // if (change.type === 'added') {
                    //     // tslint:disable-next-line: no-console
                    //     console.log('Panoramas[added]: ', change.doc.data());
                    // }
                    if (change.type === 'modified') {
                        key = change.doc.id
                        // tslint:disable-next-line: no-console
                        console.log('Panorama modificado de la lista: ', key)
                        // cuando ocurra una modificación actualizo la página del usuario para que vea la información actualizada
                        location.href = "/app/allpanoramas"

                    }
                    if (change.type === 'removed') {
                        // tslint:disable-next-line: no-console
                        console.log('Panoramas [removed] : ', change.doc.data());
                    }
                });
            });


        // tslint:disable-next-line: no-console
        //   console.log("Data en redender", observer);
        // this.setState({
        //     listPanoramas: prevProps.data1.arrayP
        // })
    }

    public handlePageChange = (pageNumber: number) => {
        //  tslint:disable-next-line: no-console
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    public onClickPage = () => {
        alert("Hola")
    }
    public render() {
        const { listPanoramas, cargando, paginaActual, totalPaginas, totalPanoramas, comuna } = this.state
        const { work, uiobtenerFecha, mensajeAccion } = this.state

        // tslint:disable-next-line: no-console
        console.log("Calificación: ", this.state.calificacion);

        const active = paginaActual + 1
        const items = [];
        for (let n = 1; n <= totalPaginas; n++) {
            items.push(
                <Pagination.Item key={n} active={n === active} >
                    {n}
                </Pagination.Item>
            );
        }
        // tslint:disable-next-line: no-console
        //  console.log("Data en redender", this.state.paginas);


        const PlacesAutocomplete = () => {
            const {
                ready,
                value,
                suggestions: { status, data },
                setValue,
                clearSuggestions,
            } = usePlacesAutocomplete({
                debounce: 300,
                requestOptions: {
                    /* Define search scope here */
                },
            });

            const ref = React.useRef<HTMLInputElement>(null);
            useOnclickOutside(ref, () => {
                clearSuggestions();
            });

            const handleInput = (e: any) => {
                // Update the keyword of the input element
                setValue(e.target.value);
            };

            const handleSelect = ({ description }: any) => () => {
                setValue(description, false);
                clearSuggestions();

                getGeocode({ address: description })
                    .then((results) => {
                        getLatLng(results[0])
                            .then(({ lat, lng }) => {

                                this.setState({
                                    cargando: true
                                })
                                const largo = results[0].address_components.length;
                                // tslint:disable-next-line:no-console
                                console.log("📍 Coordinates: ", { lat, lng });

                                const comu = results[0].address_components[largo - 4].long_name

                                // this.setState({
                                //     comuna: results[0].address_components[largo - 4].long_name,
                                // });

                                const { db } = services
                                const { paginaSize } = this.state
                                db.collection("panoramas")
                                    .where('comuna', '==', comu)
                                    .get().then(snp => {
                                        // tslint:disable-next-line: no-console
                                        console.log("Todos los panoramas", snp.docs.length)
                                        // tslint:disable-next-line: no-console
                                        console.log("Total página", snp.docs.length / paginaSize)

                                        this.setState(
                                            {
                                                comuna: comu,
                                                totalPaginas: Math.ceil(snp.docs.length / paginaSize),
                                                totalPanoramas: snp.docs.length
                                            }
                                        )


                                    })

                                this.obtenerData(this.state.paginaSize, this.state.panoramaInicial, comu)
                                    .then((res: IRespuesta) => {
                                        const { paginas } = this.state

                                        const pagina = {
                                            finalValor: res.valorFinal,
                                            inicialValor: res.valorInicial
                                        }
                                        paginas.push(pagina)
                                        this.setState({
                                            cargando: false,
                                            listPanoramas: res.arrayP,
                                            paginas,

                                        })


                                    })

                            })
                            .catch((error) => {
                                // tslint:disable-next-line:no-console
                                console.log("😱 Error: ", error);
                            });
                    })
                    .catch((error) => {
                        // tslint:disable-next-line:no-console
                        console.log("😱 Error: ", error);
                    });
            };

            const renderSuggestions = () =>
                data.map((suggestion) => {
                    const {
                        id,
                        structured_formatting: { main_text, secondary_text },
                    } = suggestion;

                    return (
                        <ListGroup.Item key={id} onClick={handleSelect(suggestion)}>
                            {" "}
                            <strong>{main_text}</strong> <small>{secondary_text}</small>
                        </ListGroup.Item>
                    );
                });

            return (
                <div ref={ref}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            className="form-control"
                            value={value}
                            onChange={handleInput}
                            disabled={!ready}
                            placeholder="Escribe la comuna dónde deseas buscar"
                            aria-label="Comuna"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    {/* We can use the "status" to decide whether we should display the dropdown or not */}
                    {status === "OK" && <ul>{renderSuggestions()}</ul>}
                </div>
            );
        };


        if (uiobtenerFecha) {


            switch (this.state.opcionAccion) {
                case 1:
                    return (
                        <Alert variant="info" className="container justify-content-center">
                            <Alert.Heading className="d-flex  container justify-content-center" > ¿Cuándo {mensajeAccion}? Selecciona una fecha. </Alert.Heading>
                            <div className="flex-column  container justify-content-center">


                                <div className="d-flex justify-content-center">
                                    Fecha: <DatePicker
                                        selected={this.state.fechaInicial}
                                        onChange={this.handleChangeDate}
                                    />
                                </div>

                                <hr />

                                <div className="d-flex justify-content-center">

                                    <Button variant="outline-primary" onClick={this.onClickAccion(this.state.opcionAccion)} ><FontAwesomeIcon icon={faCheckCircle} /> Agregar </Button>
                                    <Button variant="outline-secondary" onClick={this.cancelAdd} ><FontAwesomeIcon icon={faBan} /> Cancelar </Button>
                                    {this.state.alert}
                                </div>

                            </div>
                        </Alert>
                    );
                    break;

                case 2:
                    return (
                        <Alert variant="info" className="container justify-content-center">
                            <Alert.Heading className="d-flex  container justify-content-center" > ¿Cuándo {mensajeAccion}? Selecciona una fecha y otorga una calificación. </Alert.Heading>
                            <div className="flex-column  container justify-content-center">


                                <div className="d-flex justify-content-center">
                                    Fecha: <DatePicker
                                        selected={this.state.fechaInicial}
                                        onChange={this.handleChangeDate}
                                    />
                                </div>

                                <hr />


                                <div className="d-flex justify-content-center">
                                    Calificación: <BeautyStars
                                        maxStars={5}
                                        value={this.state.calificacion}
                                        inactiveColor="#e0e0e0"
                                        size="26px"
                                        editable={true}
                                        onChange={this.cambiarCalificacion}
                                    />
                                </div>


                                <hr />
                                <div className="d-flex justify-content-center">

                                    <Button variant="outline-primary" onClick={this.onClickAccion(this.state.opcionAccion)} ><FontAwesomeIcon icon={faCheckCircle} /> Agregar </Button>
                                    <Button variant="outline-secondary" onClick={this.cancelAdd} ><FontAwesomeIcon icon={faBan} /> Cancelar </Button>
                                    {this.state.alert}
                                </div>

                            </div>
                        </Alert>
                    );

                    break;

                default:
                    break;
            }



        }

        if (cargando || work) {
            return (

                <Alert variant="info" className="container">
                    <Alert.Heading className="d-flex container justify-content-center" > Procesando </Alert.Heading>
                    <div className="d-flex container justify-content-center">
                        <Spinner
                            className="m-5 align-middle"
                            animation="border"
                            variant="warning"
                        />
                    </div>
                </Alert>


            );
        }


        return (
            <div className="d-flex flex-wrap container justify-content-center">
                <Alert variant="light" className="container">
                    <Alert.Heading className="justify-content-lg-center" >
                        <div style={{
                            color: "#689f38"
                        }}>
                            <FontAwesomeIcon icon={faMountain} color="#689f38" /> Panoramas de Naturaleza y Aventura
                     </div>

                    </Alert.Heading>
                    <div>
                        {this.subMenuComunas(comuna)}

                    </div>
                    <hr />
                    <div className="justify-content-lg-center pl-5">
                        {/* Tienes {Object.keys(listPanoramas).length} panoramas disponibles */}

                        <h4> <FontAwesomeIcon icon={faMapPin} /> Estás en la comuna de <b>{comuna} </b></h4>
                        Y tienes {totalPanoramas} panoramas outdoors para realizar en esta zona.

                      </div>

                    <PlacesAutocomplete />

                    <hr />
                </Alert>

                {Object.keys(listPanoramas).map((x) => {
                    const post = listPanoramas[x];
                    //  tslint:disable-next-line: no-console
                    //  console.log("key ",x)

                    return (
                        <div key={x} style={{ margin: "0 auto" }}>
                            <Panorama
                                setSharedClicked={this.handleShare(x)}
                                urlImagen={post.urlImagen}
                                nombre={post.nombre}
                                nombuton={"Más informácion"}
                                descripcion={post.descripcion}
                                urlImagen1={post.urlImagen1}
                                urlImagen2={post.urlImagen2}
                                urlFacebook={post.urlFacebook}
                                urlInstagram={post.urlInstagram}
                                urlTripAdvisor={post.urlTripAdvisor}
                                urlWeb={post.urlWeb}
                                calificacion={post.calificacion}
                                exigenciaFisica={post.exigenciaFisica}
                                valor={post.valor}
                                porRealizar={this.uiObterFecha(post, "deseas cumplir este deseo", 1)}
                                realizado={this.uiObterFecha(post, "realizaste el panorama", 2)}
                                hidenCompartir={false}
                                hiddenRealizado={false}
                                hiddenXRealizar={false}
                                lat={post.lat}
                                lng={post.lng}
                                direccion={post.direccion}
                            />
                        </div>
                    );
                })}
                <div className="container d-flex justify-content-center">

                    <Pagination size="lg" >
                        <Pagination.Prev onClick={this.anteriorPagina} />
                        {items}
                        <Pagination.Next onClick={this.siguientePagina} />
                        <br />
                        {/* {  <small>Presiona la flecha para avanzar a la siguiente página</small>} */}

                    </Pagination>


                    {this.state.alert}

                </div>

            </div>
        );

        // }



    }




    private cambiarComuna = (comuna: string) => async () => {
        const { db } = services
        const { paginaSize } = this.state
        this.setState({
            cargando: true,
        });
        await db.collection("panoramas")
            .where('comuna', '==', comuna)
            .get().then(snp => {
                // tslint:disable-next-line: no-console
                console.log("Todos los panoramas", snp.docs.length)
                // tslint:disable-next-line: no-console
                console.log("Total página", snp.docs.length / paginaSize)

                this.setState(
                    {
                        comuna,
                        totalPaginas: Math.ceil(snp.docs.length / paginaSize),
                        totalPanoramas: snp.docs.length
                    }
                )


            })

        this.obtenerData(this.state.paginaSize, this.state.panoramaInicial, comuna)
            .then((res: IRespuesta) => {
                const { paginas } = this.state

                const pagina = {
                    finalValor: res.valorFinal,
                    inicialValor: res.valorInicial
                }
                paginas.push(pagina)
                this.setState({
                    listPanoramas: res.arrayP,
                    paginas,

                })


            })
        this.setState({
            cargando: false,
        });
    }


    private handleShare = (id: string) => () => {
        // const { share} = this.props
        // share(id)
        // Implmentar compartir
    };

    private porRealizar = () => {
        const { panorama, fechaInicial } = this.state
        const { porRealizarAdd } = this.props
        this.setState({
            uiobtenerFecha: false,
            work: true,
        });
        porRealizarAdd(panorama, fechaInicial).then((res: string) => {
            if (res === "OK") {
                this.setState({
                    work: false,
                });

                this.onAlert("Deseados", "xrealizar")

            } else {
                this.setState({
                    work: false,
                });
                this.onAlertError(res)
            }
        })
    }

    private realizado = () => {
        const { panorama, fechaInicial, calificacion } = this.state
        const { realizadoAdd } = this.props
        if (calificacion === 0) {

            this.setState({
                alert: (
                    <SweetAlert
                        warning={true}
                        title="¡Cuidado!"
                        showCloseButton={true}
                        confirmBtnText="Entendí"
                        onConfirm={this.hideAlert(false)}>
                        Debes marcar una calificación.
                        {/* {  <BeautyStars
                            maxStars={5}
                            value={this.state.calificacion}
                            inactiveColor="#e0e0e0"
                            size="26px"
                            editable={true}
                            onChange={this.cambiarCalificacion}
                        />} */}
                    </SweetAlert>
                ),
            });
            //   alert("debes ingresar una calificacion seleccionar una calificación")

        } else {
            this.setState({
                uiobtenerFecha: false,
                work: true,
            });
            realizadoAdd(panorama, fechaInicial, calificacion).then((res: string) => {
                if (res === "OK") {
                    this.setState({
                        work: false,
                    });

                    this.onAlert("Realizados", "realizados")

                } else {
                    this.setState({
                        work: false,
                    });
                    this.onAlertError(res)
                }
            })


        }

    }
}


const mapStateToProps = (state: IState) => {
    const {
        Posts: { data1, fetched, fetching },
    } = state;
    const loading = fetching || !fetched;

    // cuando retornemos el estado vamos a traer solamente loading pero tambien fetched
    // porque lo estamos usando en el constructor. Y data que son los datos de los posts
    return {
        data1,
        fetched,
        loading,
    };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) =>
    bindActionCreators(postsDuck, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AllPanoramas);
