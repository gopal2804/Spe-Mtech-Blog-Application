import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../middleware/ContextHooks';
import { Transition } from 'react-transition-group';
import { LoremIpsum } from 'lorem-ipsum';
import { toast } from 'react-toastify';
import gsap from 'gsap';
import {
  Container, Paper, Button, TextField, Stack, IconButton, Typography,
  Grid, Slider, FormControlLabel, Checkbox, containerClasses
} from '@mui/material'

// #beginregion ------------Components-----------
import MainContainer from '../components/MainContainer';
// #endregion

export default function NewBlog() {
  const navigate = useNavigate();

  const [newBlog, setNewBlog] = useState({
    title: '',
    content: ''
  });
  const { toasts, clearErrors, createBlog, blogs, getBlogs } = useBlog();

  const [onGenerate, setOnGenerate] = useState(false);



  const handleSave = () => {
    if (newBlog.title.length > 0 && newBlog.content.length > 0) {
      createBlog(newBlog);
      navigate('/blogs')
    } else {
      toast('Please fill out all fields', { type: 'error' });
    }
  }

  useEffect(() => {
    if (!blogs) {
      getBlogs();
    }

    if (toasts) {
      toasts.forEach(ele => {
        toast(ele.message, { type: ele.type })
      });
      clearErrors();
    }
  }, [toasts, clearErrors, blogs, getBlogs])


  const [loremOptions, setLoremOptions] = useState({
    minWordPerSentence: 3,
    maxWordPerSentence: 16,
    wordPerSentence: 4,

    minSentencePerParagraph: 4,
    maxSentencePerParagraph: 20,
    sentencePerParagraph: 5,

    minParagraphPerBlog: 2,
    maxParagraphPerBlog: 10,
    paragraphPerBlog: 3
  })

  const handelGenerate = () => {
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: loremOptions.maxSentencePerParagraph,
        min: loremOptions.minSentencePerParagraph,
      },
      wordsPerSentence: {
        max: loremOptions.maxWordPerSentence,
        min: loremOptions.minWordPerSentence
      },
    })
    setNewBlog({
      title: lorem.generateSentences(1),
      content: lorem.generateSentences(loremOptions.paragraphPerBlog)
    })
  }
  return (
    <MainContainer>
      <Container maxWidth="md" sx={{ py: 2, my: 1, backgroundColor: 'silver' }} component={Paper}>
        <Grid container spacing={2}>
          <Grid item>
            <FormControlLabel align="left"
              control={<Checkbox
                checked={onGenerate}
                onChange={() => setOnGenerate(!onGenerate)}
              />} label='Auto Generate' />
          </Grid>



          <Transition timeout={1000} in={onGenerate} mountOnEnter unmountOnExit onEntering={(node)=>{
            gsap.from(node,{
              y:-50,
              autoAlpha:onGenerate ? 0: 1,
              duration:0.5
            })
          }} 
            addEndListener={(node,done)=>{
            gsap.to(node,{
              y: onGenerate ? 0:-50,
              autoAlpha: onGenerate ? 1:0,
              onComplete: done
            })
          }}>
            <Grid item xs={12} container spacing={2} >
              <Grid item xs={12} lg={4}>
                <Typography>Words Per Sentence</Typography>
                <Slider
                  marks={[
                    { value: loremOptions.minWordPerSentence, label: loremOptions.minWordPerSentence },
                    { value: loremOptions.maxWordPerSentence, label: loremOptions.maxWordPerSentence }
                  ]}
                  value={loremOptions.wordPerSentence}
                  min={loremOptions.minWordPerSentence}
                  max={loremOptions.maxWordPerSentence}
                  onChange={(e, value) => setLoremOptions({ ...loremOptions, wordPerSentence: value })}
                />
              </Grid>

              <Grid item xs={12} lg={4}>
                <Typography>Sentences Per Paragraph</Typography>
                <Slider
                  marks={[
                    { value: loremOptions.minSentencePerParagraph, label: loremOptions.minSentencePerParagraph },
                    { value: loremOptions.maxSentencePerParagraph, label: loremOptions.maxSentencePerParagraph }
                  ]}
                  value={loremOptions.sentencePerParagraph}
                  min={loremOptions.minSentencePerParagraph}
                  max={loremOptions.maxSentencePerParagraph}
                  onChange={(e, value) => setLoremOptions({ ...loremOptions, sentencePerParagraph: value })}
                />
              </Grid>

              <Grid item xs={12} lg={4}>
                <Typography>Paragraphs Per Blog</Typography>
                <Slider
                  marks={[
                    { value: loremOptions.minParagraphPerBlog, label: loremOptions.minParagraphPerBlog },
                    { value: loremOptions.maxParagraphPerBlog, label: loremOptions.maxParagraphPerBlog }
                  ]}
                  value={loremOptions.paragraphPerBlog}
                  min={loremOptions.minParagraphPerBlog}
                  max={loremOptions.maxParagraphPerBlog}
                  onChange={(e, value) => setLoremOptions({ ...loremOptions, paragraphPerBlog: value })}
                />
              </Grid>

              <Grid item>
                <Button fullWidth={false} onClick={handelGenerate}>Generate Blog</Button>
              </Grid>
            </Grid>
          </Transition>

          <Grid item xs={12}>
            <TextField label="Title" value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline minRows={8} maxRows={20}
              label="Content" value={newBlog.content} onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}></TextField>
          </Grid>
          <Grid item>
            <Stack spacing={2} direction="row">
              <Button onClick={handleSave}>Save</Button>
              <Button variant='outlined' onClick={e => setNewBlog({ title: '', content: '' })}>Clear</Button>
              <Button onClick={() => navigate('/blogs')}>Cancel</Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </MainContainer>
  )
}
