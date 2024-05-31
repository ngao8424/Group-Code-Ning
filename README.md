# Individual Task
This project involves creating an interactive <strong> audio-visual </strong> display system that visualizes music through animated wave patterns. Users can play music through the interface, and the playback will directly influence the animation of the waves on the screen. Attributes of the waves, such as amplitude, frequency, and color, are dynamically adjusted based on the audio's frequency data.

### Instructions
![Image of Play/Pause button](assets/Play/Pause.jpg)

  >Starting the experience is straightforward—simply click the play/pause button located at the top left of the screen to start the music. Once the music begins, you will observe the waves on the screen adjust their movements according to the dynamics of the music, showcasing the rhythm and intensity of the music.


### Individual Animation Approach
  >In this project, I utilize audio signals to drive the animations, ensuring that the visual representations directly respond to the music's frequency and amplitude, creating a synchronized audio-visual experience. In terms of animation implementation, I focus on animating the wave patterns themselves, adjusting their height (amplitude), shape (frequency), and initial phase (offset), and ensuring that the color of each wave smoothly transitions from light blue to dark blue. Compared to other team members, my unique contribution lies in directly linking wave motion to audio playback. Other team members have their own focuses, for example, some control animations over time while others use Perlin noise to enhance visual effects.

![Image of Project2](assets/After.jpg)
#### Image of Project

### Technical Details
  >On the technical side, I analyze the audio using FFT to extract frequency data, which is crucial for dynamically adjusting the wave's amplitude. Through a series of calculations, I set the vertical starting position of each wave and dynamically adjust the height of each wave based on the audio spectrum data. Additionally, I have detailed adjustments for wave frequency and wavelength to ensure the responsiveness and accuracy of the animations. I referred to "Tutorial11" for methods on how to effectively load audio files into my project and use FFT outputs as the main driving force for animations, allowing precise control over the dynamics of each wave.

### Inspiration and Resources
![Image of inspiration](assets/Inspiration.jpg)

[Link to Soundwave-Loop](https://www.youtube.com/watch?v=BA_eliXeZEg)
  >My main visual inspiration comes from the <em>"Soundwave-Loop"</em> video by Alexis Kimbrough on YouTube, which demonstrates how audio and visual elements can be tightly synchronized to display the dynamics of music. This approach to audio-visual synchronization not only deepens the understanding of musical rhythm and intensity but also significantly enhances the sensory experience of the audience. By emulating this effect, I hope to capture the fluidity and emotion of music in my project, allowing viewers to visually experience the fluctuations and rhythms of music.
