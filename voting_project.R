##voting project
install.packages('dplyr')
library(dplyr)

setwd('/Users/lindsaycarbonell/Documents/REPOS/voting-project')
voter_stats_midterm = read.csv('voterstats_11_02_10.csv', header = T)

colnames(voter_stats_midterm)
typeof(voter_stats_midterm$age)

voter_stats_midterm_filt <- voter_stats_midterm %>%
  select(age)

voter_stats_midterm_filt
