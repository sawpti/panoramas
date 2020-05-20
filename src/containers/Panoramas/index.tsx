import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Panorama from "../../components/Panorama";
import { IState } from "../../ducks";
import * as postsDuck from "../../ducks/Panoramas";
// import noImage from '../../images/unnamed.jpg';

import {
    Spinner,
    Container,
    Alert,
    ListGroup,
    InputGroup,
    FormControl,
    Pagination,

} from "react-bootstrap";

// import { useState } from 'react';
// import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountain, faSearch } from '@fortawesome/free-solid-svg-icons';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
// import Geocode from 'react-geocode'
import useOnclickOutside from "react-cool-onclickoutside";
import services from 'src/service';






interface INewsFeedProps {
    // fetchPosts: () => void
    fetchFindPanoramaComuna: (comuna: string, limite: number) => void
    fetchFindPanoramasByComuna: (paginaSize: number, panoramaInicial: any, comuna: string) => void
    xrealizar: (a: string) => void; // Referencia del panorama que vamos a a gregar a la lista  "Por realizar"
    realizado: (a: string) => void; // Referencia del panorama que vamos a a gregar a la lista de "Realizados"
    share: (a: string) => void; // vamos a necesitar la referencia del panorama  al que le damos share
    sharetemp: (a: string) => void;
    fetched: boolean
    loading: boolean
    data1: postsDuck.IDataFirebase
    data: postsDuck.IDataPanorama
}
interface IStatePanorama {
    // alert: any
    work: boolean
    listPanoramas: postsDuck.IDataPanorama
    comuna: string
    activePage: number
    paginaActual: number
    paginas: any[]
    paginaSize: number
    panoramaInicial: any
    cargando: boolean
    totalPanoramas: number
    totalPaginas: number


}
interface IRespuesta {
    arrayP: postsDuck.IDataPanorama
    valorFinal: any
    valorInicial: any
}


class AllPanoramas extends React.Component<INewsFeedProps, IStatePanorama> {
    constructor(props: INewsFeedProps) {
        super(props);
        this.state = {
            activePage: 1,
            cargando: true,
            comuna: "Curarrehue",
            listPanoramas: {},
            paginaActual: 0,
            paginaSize: 3, // panoramas por página
            paginas: [],
            panoramaInicial: null,
            totalPaginas: 0,
            totalPanoramas: 0,
            work: false,
        }

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
            console.log("Valor inicial: ", inicialValor);
            const finalValor = snapshot.docs[snapshot.docs.length - 1]
            // tslint:disable-next-line: no-console
            console.log("Valor Final ", finalValor)

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
        const { db } = services
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
            console.log("Data Firebase en componentDidMount[res]", res.arrayP);

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
        console.log("Data en redender", this.state.paginas);


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

        // if (this.state.cargando) {
        //     return (
        //         <Container
        //             fluid={true}
        //             className="align-content-center justify-content-center d-flex p-5"

        //         >
        //             <Spinner
        //                 className="mt-5 align-middle"
        //                 animation="border"
        //                 variant="info"
        //             />
        //             ...Cargando...
        //         </Container>
        //     );
        // }

        if (cargando) {
            return (
                <Container
                    fluid={true}
                    className="align-content-center justify-content-center d-flex p-5"
                >
                    <Spinner
                        className="mt-5 align-middle"
                        animation="border"
                        variant="info"
                    />
                </Container>
            );
        }

        if (this.state.work) {
            return (
                <Alert variant="info" className="container">
                    <Alert.Heading> ... </Alert.Heading>
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
                    <Alert.Heading className="justify-content-lg-center">
                        {" "}
                        <FontAwesomeIcon icon={faMountain} /> Panoramas de Aventura y
            Naturaleza{" "}
                    </Alert.Heading>
                    <hr />
                    <div className="justify-content-lg-center pl-5">
                        {/* Tienes {Object.keys(listPanoramas).length} panoramas disponibles */}
                        Tienes {totalPanoramas} panoramas outdoors en {comuna}
                        <h4> {this.state.comuna}</h4>
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
                                porRealizar={this.handlePorRealizar(x)}
                                realizado={this.handleRealizado(x)}
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
                    </Pagination>


                    {/* { <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item active={true}>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled={true}>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>} */}
                </div>
            </div>
        );

        // return (
        //     loading ? (
        //         <Container fluid={true} className="align-content-center justify-content-center d-flex p-5">
        //             <Spinner className="mt-5 align-middle" animation="border" variant="primary" />
        //         </Container>) :
    }

    // private next = () => {
    //     alert("Hola")
    // }
    private handlePorRealizar = (id: string) => () => {
        const { xrealizar } = this.props;
        this.setState({
            work: true,
        });
        xrealizar(id);
        //  tslint:disable-next-line: no-console
        console.log("Agregando a la lista de por realizar ", this.state.work);
        setTimeout(() => {
            // tslint:disable-next-line: no-console
            console.log("Ya se agregó  a la lista por realizar", this.state.work);
            this.setState({
                work: false,
            });
        }, 2000);

        //   location.href = "/app/xrealizar";
    };
    private handleRealizado = (id: string) => () => {
        const { realizado } = this.props;
        this.setState({
            work: true,
        });
        realizado(id);

        setTimeout(() => {
            this.setState({
                work: false,
            });

            // location.href = "/app/realizados";
        }, 2000);

        //   this.accionThisGoal('El panorama fue agregado a tu lista de "Realizados". Y quitado de tu lista "Por realizar"')
    };

    private handleShare = (id: string) => () => {
        // const { share} = this.props
        // share(id)
        // Implmentar compartir
    };
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
