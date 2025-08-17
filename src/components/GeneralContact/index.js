import * as React from 'react';
import xIcon from '../../images/icons8-twitter.svg';
import instagramIcon from '../../images/icons8-instagram-48.svg';
import { sendContactEmail } from '../../utils/emailService';

export default function GeneralContact(props) {
  const [formData, setFormData] = React.useState({
    name: '',
    emailAddress: '',
    phoneNumber: '',
    serviceType: '',
    referral: '',
    message: '',
  });

  console.log(formData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // keep only numbers
    if (value.length > 3 && value.length <= 6) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 6) {
      value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
    }
    setFormData((prev) => ({ ...prev, phoneNumber: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactEmail({
        name: formData.name,
        email: formData.emailAddress, // 👈 rename key to match backend
        phoneNumber: formData.phoneNumber,
        serviceType: formData.serviceType,
        referral: formData.referral,
        message: formData.message,
      });

      alert('Message sent successfully!');
      setFormData({
        name: '',
        emailAddress: '',
        phoneNumber: '',
        serviceType: '',
        referral: '',
        message: '',
      });
    } catch (error) {
      console.error(error);
      alert('Failed to send message.');
    }
  };


  return (
    <div style={{ marginTop: 20, marginBottom: 20, maxWidth: '600px', paddingBottom: 0 }} className="div-block-42">
      <h1 style={{ textAlign: 'center' }} className="heading-22">
        CON<span onClick={props.onClose}>TACT <span className="text-span-26"><br /></span></span>
      </h1>

      <h5 className="heading-22-copy" style={{ textAlign: 'center', width: '100%', paddingTop: '0' }}>
        Give me a call/text:
        <a href="tel:609-469-4340" className="link-3">609-469-4340<br /></a>
        <span onClick={props.onClose} className="text-span-26"></span>
      </h5>

      <div className="form-normal-social" style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: 0 }}>
        <a href="https://instagram.com/frombelowstudio" target="_blank" rel="noreferrer" style={{ marginRight: '10px', marginTop: '-7px' }} className="link-12">
          <img style={{ width: '32px' }} src={instagramIcon} alt='From Below Instagram' />
        </a>
        |
        <a style={{ marginRight: '10px', marginTop: '-7px', marginLeft: '10px' }} href="https://x.com/frombelowstudio" target="_blank" rel="noreferrer" className="link-5">
          <img style={{ width: '31px' }} src={xIcon} alt="From Below X Twitter" />
        </a>
      </div>

      <div className="w-form">
        <form onSubmit={handleSubmit} id="wf-form-Contact-Form" className="form-2">
          <input
            type="text"
            className="text-field-3 w-input"
            maxLength="256"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            className="text-field-3 w-input"
            maxLength="256"
            name="emailAddress"
            placeholder="Enter your email"
            value={formData.emailAddress}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            className="text-field-3 w-input"
            maxLength="12"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
          />

          <label className="field-label-6">What service are you interested in?</label>
          <div style={{ display: 'flex', justifyContent: 'center' }} className="div-block-44">
            {['Recording', 'Mixing', 'Studio Use'].map((option) => (
              <label key={option} className="radio-button-field-2 w-radio">
                <input
                  type="radio"
                  name="serviceType"
                  value={option}
                  checked={formData.serviceType === option}
                  onChange={handleChange}
                  className="w-form-formradioinput radio-button-2 w-radio-input"
                />
                <span className="field-label-5 w-form-label">{option}</span>
              </label>
            ))}
          </div>

          <div className="div-block-44">
            <label className="field-label-6">How did you hear about From Below Studio?</label>
            <select
              name="referral"
              value={formData.referral}
              onChange={handleChange}
              required
              className="select-field w-select"
            >
              <option value="">Select</option>
              <option value="Website">Website</option>
              <option value="Instagram">Instagram</option>
              <option value="Twitter">Twitter</option>
              <option value="Facebook">Facebook</option>
              <option value="Recommendation">Recommendation</option>
              <option value="Google Search">Google Search</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <textarea
            name="message"
            placeholder="Tell me about your project"
            maxLength="5000"
            required
            className="text-field-3 textarea w-input"
            value={formData.message}
            onChange={handleChange}
          />

          <input type="submit" value="Send" className="fbs-button contact-button w-button" style={{ display: 'block', margin: '20px auto' }} />
        </form>
      </div>
    </div>
  );
}
