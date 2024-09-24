import PropTypes from 'prop-types';
import { Global } from '../../helpers/Global';
import { Link } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import avatar from '../../assets/img/default.png';
import ReactTimeAgo from "react-time-ago";

export const PublicationList = ({publications, getPublications, page, setPage, more, setMore}) => {

    const { auth } = useAuth();

    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getPublications(next);
    }

    const deletePublication = async (publicationId) => {
        const request = await fetch(Global.url + "publication/delete-publication/" + publicationId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        const data = await request.json();

        // Verifica el resultado de la operación y realiza acciones adicionales si es necesario
        if (data.status === "success") {
            console.log("Publicación eliminada correctamente");
        } else {
            console.error("Error al eliminar la publicación");
        }

        setPage(1);
        setMore(true);
        getPublications(1, true);

    }

    return (
        <>
            <div className="content__posts">

                {publications.map(publication => {

                    return (
                        <article className="posts__post" key={publication._id}>

                            <div className="post__container">

                                <div className="post__image-user">
                                    <Link to={"/social/perfil/" + publication.user._id} className="post__image-link">
                                        {publication.user.image != "default.png" && (
                                            <img src={publication.user.image} className="post__user-image" alt="Foto de perfil" />
                                        )}
                                        {publication.user.image == "default.png" && (
                                            <img src={avatar} className="post__user-image" alt="Foto de perfil" />
                                        )}
                                    </Link>
                                </div>

                                <div className="post__body">

                                    <div className="post__user-info">
                                        <a href="#" className="user-info__name">{publication.user.name + " " + publication.user.last_name}</a>
                                        <span className="user-info__divider"> | </span>
                                        <a href="#" className="user-info__create-date"><ReactTimeAgo date={publication.created_at} locale="es-ES" /></a>
                                    </div>

                                    <h4 className="post__content">{publication.text}</h4>

                                    {publication.file && (
                                        <img src={publication.file} alt="Imagen de publicación"/>
                                    )}
                                </div>

                            </div>

                            {auth._id == publication.user._id &&
                                <div className="post__buttons">

                                    <button onClick={() => deletePublication(publication._id)} className="post__button">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>

                                </div>
                            }

                        </article>);
                })}
            </div>

            {
                more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas publicaciones
                    </button>
                </div>
            }
        </>
    )
}

PublicationList.propTypes = {
    publications: PropTypes.array.isRequired,
    getPublications: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    more: PropTypes.bool.isRequired,
    setMore: PropTypes.func.isRequired
};