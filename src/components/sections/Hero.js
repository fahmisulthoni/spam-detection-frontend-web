import React, { useState, useEffect } from 'react';
import { FiSearch } from "react-icons/fi"
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Button from '../elements/Button';
import Input from '../elements/Input';

import Fade from 'react-reveal/Fade';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { SearchOutlined } from '@ant-design/icons'

import loading from '../../assets/lottie/paper.gif';

import API from '../../utils/Api';

import './hero.css'

 
const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const [tweetUrl, setTweetUrl] = useState('');

  const [responData, setResponseData] = useState();

  const [isProcessing, setProcess] = useState(false);

  const [isResult, setResult] = useState(false)

  const [tweetId, setTweetId] = useState('')

  const [isSuccess, setSuccess] = useState(false)

  useEffect(() => {

  }, [responData, isProcessing, tweetId])

  const onSubmit = async e => {
    e.preventDefault()
    setProcess(true)
    let fd = new FormData()
    fd.append('url', tweetUrl)
    await API.post('/tweets', fd)
      .then(res => {
        setSuccess(true)
        console.log(res.data)
        setResponseData(res.data.values)
        setResult(true)
        setProcess(false)
        setTweetId(res.data.values.id.toString())
      })
      .catch(err => {
        if(err.response) {
          console.error(err.response)
        }
        setSuccess(false)
        setResult(true)
        setProcess(false)
      })

  }

  const onBackPressed = () => {
    setProcess(false)
    setResult(false)
    setTweetUrl('')
  }

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            {!isProcessing && !isResult && (
              <Fade bottom>
                <div>
                  <h1 className="mt-0 mb-16">
                    Twispad<span className="text-color-primary">(Tweet Spam Detector)</span>
                  </h1>
                  <div className="container-xs">
                    <p className="m-0 mb-32">
                    Pastikan tweet yang anda lihat bukanlah spam. Silahkan masukkan url tweet dibawah ini dengan benar dan lengkap.
                      </p>
                      <form className="form-search" onSubmit={onSubmit}>
                      
                            <Input  
                              // style={{width: 500}}
                              className="search-input"
                              id="url" type="text" label="url" labelHidden hasIcon="right"
                              placeholder="Enter twitter url here"
                              value={tweetUrl}
                              onChange={event => setTweetUrl(event.target.value)}>
                              
                            </Input>
                            <Button color="primary">
                                  <SearchOutlined />
                            </Button>
                      </form>
                  </div>
                </div>
              </Fade>
            )}
            {isProcessing && (
              <Fade>
                <img src={loading} alt="loading..." />
              </Fade>
            )}
            {isResult && tweetId != null && (
              <Fade bottom>
                <div>
                  {isSuccess ? (
                    <>
                      <h2 className="mt-0 mb-16">
                      Hasil deteksi</h2>
                      <div style={{display:'flex',justifyContent:'center'}}>
                        <TwitterTweetEmbed tweetId={tweetId} />
                      </div>
                      <h1>{responData.result}</h1>
                    </>
                  ) : 
                  (
                    <h3 style={{marginBottom: 30}}>Pencarian gagal. Silahkan periksa kembali url yang anda masukkan.</h3>
                  )}                  
                  <Button color="primary" onClick={() => {
                    onBackPressed()
                  }}>Kembali</Button>
                </div>
              </Fade>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;