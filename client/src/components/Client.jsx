export default function Clients({allClients}){
    return(
        <>
            <section id="team" data-stellar-background-ratio="1" style={{backgroundPosition: "0px 0px"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <div className="about-info">
                                <h2 className="wow fadeInUp animated" data-wow-delay="0.1s" style={{visibility: "visible", animationDelay: "0.1s", animationName: "fadeInUp"}}>Our Clients</h2>
                            </div>
                        </div>

                        <div className="clearfix"></div>
                        {
                            allClients.map(client => {
                                return(
                                    <div key={client.id} className="col-md-4 col-sm-6 mt-4">
                                        <div className="team-thumb wow fadeInUp animated" data-wow-delay="0.2s" style={{visibility: "visible", animationDelay: "0.2s", animationName: "fadeInUp"}}>
                                            <img src={''} className="img" alt="" />
                                            <div className="team-info">
                                                    <h3>{client.name}</h3>
                                                    <p>{client.category}</p>
                                                    <div className="team-contact-info">
                                                        <p><i className="fa fa-map"></i>{client.address}</p>
                                                        <p><i className="fa fa-envelope-o"></i> <a href="#">{client.email}</a></p>
                                                    </div>
                                                    <ul className="social-icon">
                                                        <li><a href="#" className="fa fa-linkedin-square"></a></li>
                                                        <li><a href="#" className="fa fa-envelope-o"></a></li>
                                                    </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
             </section>
        </>
    )
}