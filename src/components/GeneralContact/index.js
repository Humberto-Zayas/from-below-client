import * as React from 'react';

export default function GeneralContact(props) {

  return (
    <>
      <div style={{ marginTop: 20, marginBottom: 20, maxWidth: '600px', paddingBottom: 0 }} class="div-block-42">
        <h1 style={{ textAlign: 'center' }} class="heading-22">
          CON<span onClick={props.onClose}><span>TACT <span data-ix="contact-section-reveal" class="text-span-26">
            <br></br></span></span></span>
        </h1>
        <h5 class="heading-22-copy" style={{ textAlign: 'center', width: '100%', paddingTop: '0' }}>Give me a call/text:
          <a href="tel:609-469-4340" class="link-3">609-469-4340<br></br></a><span><span><span data-ix="contact-section-reveal" onClick={props.onClose} class="text-span-26"></span></span></span></h5>
        <div class="form-normal-social" style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: 0 }}>
          <span class="text-span-29"></span>
          <a href="https://instagram.com/frombelowstudio" target="_blank" rel="noreferrer" style={{ marginRight: '10px' }} class="link-12"></a> | <a style={{ marginRight: '10px', marginLeft: '10px' }} href="https://twitter.com/frombelowstudio" target="_blank"  rel="noreferrer" class="link-5"></a> | <a style={{ marginLeft: '10px' }} href="https://facebook.com/frombelowstudio" target="_blank" rel="noreferrer" class="link-6"></a>
        </div>
        <div class="w-form">
          <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden>
            <input type="text" name="name" />
            <input type="email" name="email" />
            <input type="text" name="phone-number" />
            <input type="text" name="phone-number" />
            <textarea name="message"></textarea>
          </form>

          <form action="/" id="wf-form-Contact-Form" name="wf-form-Contact-Form" data-name="Contact Form" method="post" class="form-2">
          <input type="hidden" name="contact" value="contact" />

            <input type="text" class="text-field-3 w-input" autofocus="true" maxlength="256" name="name" data-name="name" placeholder="Enter your name" id="name-3" required="" />
            <input type="email" class="text-field-3 w-input" maxlength="256" name="emailAddress" data-name="emailAddress" placeholder="Enter your email" id="emailAddress" required="" />
            <input type="text" class="text-field-3 w-input" maxlength="256" name="phone-number" data-name="phone-number" placeholder="Phone Number" id="phone-number" />
            <label for="How-Did-You-Hear-About-Us" class="field-label-6">What service are you interested in?</label>
            <div style={{ display: 'flex', justifyContent: 'center' }} class="div-block-44">
              <label class="radio-button-field-2 w-radio">
                <input type="radio" id="Recording-2" name="Service-Type" value="Recording" data-name="Service Type" class="w-form-formradioinput radio-button-2 w-radio-input" />
                <span for="Recording-2" class="field-label-5 w-form-label">Recording</span>
              </label>
              <label class="radio-button-field-2 w-radio">
                <input type="radio" id="Mixing-2" name="Service-Type" value="Mixing" data-name="Service Type" class="w-form-formradioinput radio-button-2 w-radio-input" />
                <span for="Mixing-2" class="field-label-5 w-form-label">Mixing</span>
              </label>
              <label class="radio-button-field-2 w-radio"><input type="radio" id="Studio Use" name="Service-Type" value="Studio Use" data-name="Service Type" class="w-form-formradioinput radio-button-2 w-radio-input" /><span for="Studio Use" class="field-label-5 w-form-label">Studio Use</span>
              </label>
            </div>
            <div class="div-block-44">
              <label for="How-Did-You-Hear-About-Us" class="field-label-6">How did you hear about From Below Studio?</label>
              <select id="How-Did-You-Hear-About-Us" name="How-Did-You-Hear-About-Us" data-name="How Did You Hear About Us" required="" class="select-field w-select">
                <option value="Website">Website</option>
                <option value="Instagram">Instagram</option>
                <option value="Twitter">Twitter</option>
                <option value="Facebook">Facebook</option>
                <option value="Recommendation">Recommendation</option>
                <option value="Google Search">Google Search</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <textarea id="message" name="message" placeholder="Tell me about your project" maxlength="5000" data-name="message" required="" class="text-field-3 textarea w-input"></textarea>
            <input type="submit" value="Send" data-wait="Sending..." class="fbs-button contact-button w-button" style={{ display: 'block', margin: '20px auto' }} />
          </form>
          <div class="success-message w-form-done">
            <div class="text-block-26">Thanks for reaching out. I usually respond in under 48 hours. You can call or text 609-469-4340 for a faster reply. Please take time to check out the <span data-ix="contact-reveal-2" class="text-span-30">Studio Policy</span> while you wait for your reply.</div>
          </div>
          <div class="error-message w-form-fail">
            <div class="text-block-28">*Name and email are required to send a message.</div>
          </div>
        </div>
      </div>
    </>
  )
}