#######################################
# Evan Collins
# 22 August 2021
# Yale Brain Atlas Database
# Credit: Neurosynth for fMRI dataset
#######################################

library(shiny)

# Define UI for app that draws a histogram ----
ui <- fluidPage(
  
  # App title ----
  titlePanel("Yale Brain Atlas Database"),
  
  # Sidebar layout with input and output definitions ----
  sidebarLayout(
    
    # Sidebar panel for inputs ----
    sidebarPanel(
      h4("Under construction."),
      h5("Will feature dynamic visualizations of fMRI, PET, iEEG, stimulation mapping, among others. Will include a robust fMRI database that details the functions associated with each parcel.")
    ),
    
    # Main panel for displaying outputs ----
    mainPanel(
      
    )
  )
)

server <- function(input, output) {
  
}

shinyApp(ui = ui, server = server)
