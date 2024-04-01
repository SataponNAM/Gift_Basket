import { FaFacebook } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaLine } from "react-icons/fa";

function Footer() {
    return (
        <footer className="text-center text-lg-start bg-body-tertiary text-muted">
            <section className="">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col">
                            <h6 className="text-uppercase fw-bold mb-4">Contact Us</h6>
                            <div className="d-flex align-items-center">
                                <span><FaFacebook /> Gift Basket For U</span>
                                <span><FaLine />@GiftBasketForU</span>
                                <span><MdEmail /> GiftBasketForU@email.com</span>
                                <span><BsFillTelephoneFill /> 081 234 5678</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    )

}

export default Footer