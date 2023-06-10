# frozen_string_literal: true

def with_captured_stdout
  original_stdout = $stdout  # capture previous value of $stdout
  $stdout = StringIO.new     # assign a string buffer to $stdout
  yield                      # perform the body of the user code
  $stdout.string             # return the contents of the string buffer
ensure
  $stdout = original_stdout  # restore $stdout to its previous value
end

module JekyllAdmin
  class Server < Sinatra::Base
    namespace "/action" do
      get "/ping" do
        json "pong"
      end

      get "/config" do
        json site.config
      end

      get "/config/:config_key" do
        json site.config[params["config_key"]]
      end

      get "/process" do
        content_type "text/plain"
        with_captured_stdout { 
          site.process
        }
        # json site.config

        # Failed attempts to force full rebuild with reset of incremental
        # content_type "text/plain"
        # newconfig = site.config.clone
        # newconfig['profile'] = false
        # newconfig['livereload'] = false
        # newconfig['incremental'] = false
        # newconfig['watch'] = false
        # newconfig['serving'] = false
        # tempsite = Jekyll::Site.new(newconfig)
        # with_captured_stdout { 
        #   tempsite.process 
        # }
        # json tempsite.config
      end

      # Note: webrick does not support streaming, too bad
      get "/ls" do
        content_type "text/plain"
        %x( ls )
        #content_type "text/event-stream"
        #IO.popen('ls ; sleep 4; ls')
      end

      get "/build" do
        content_type "text/plain"
        %x( sh command-build.sh )
      end

      get "/reset" do
        content_type "text/plain"
        with_captured_stdout { 
          site.reset
          #JekyllIncludeCache.reset
          site.process
        }
      end

      get "/shutdown" do
        content_type "text/event-stream"
        Jekyll::Commands::Serve.shutdown
        "Site shutdown"
      end

      get "/log" do
        content_type "text/plain"
        JekyllAdmin.logs
      end

      get "/logfile" do
        content_type "text/plain"
        %x( cat serve.log )
      end

    end
  end
end
