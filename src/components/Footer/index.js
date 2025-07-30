import xIcon from '../../images/icons8-twitter.svg';
import instagramIcon from '../../images/icons8-instagram-48.svg'

function Footer() {

  return (
    <div className="footer">
      <div className="fbs-container">
        <h1 className="heading-13">
           
         FROMBELOWSTUDIO
          
        </h1>

        <div id="sb_instagram" className="sbi sbi_col_4" style={{ width: '100%', paddingBottom: '10px' }} data-id="801759764" data-num="8" data-res="auto" data-cols="4" data-options="{&quot;sortby&quot;: &quot;none&quot;, &quot;showbio&quot;: &quot;false&quot;, &quot;headercolor&quot;: &quot;ebebeb&quot;, &quot;imagepadding&quot;: &quot;5&quot;}" data-sbi-index="0">
          <div class="form-normal-social" style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: 0 }}>
          <span class="text-span-29"></span>
          <a href="https://instagram.com/frombelowstudio" target="_blank" rel="noreferrer" style={{ marginRight: '10px', marginTop: '-7px' }} class="link-12"><img style={{width: '32px'}} src={instagramIcon} alt='From Below Instagram' /></a> | <a style={{ marginRight: '10px', marginTop: '-7px', marginLeft: '10px' }} href="https://x.com/frombelowstudio" target="_blank" rel="noreferrer" class="link-5"><img style={{width: '31px'}} src={xIcon} alt="From Below X Twitter" />

          </a>
        </div>
        </div>

        <div className="text-block-11">© From Below Studio {new Date().getFullYear()}</div>
      </div>
    </div>
  )

}

export default Footer;